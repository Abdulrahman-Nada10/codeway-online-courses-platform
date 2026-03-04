using CourseContentMicroService.Application.DTO_s.AnswersDTO_s;
using CourseContentMicroService.Application.DTO_s.SubmissionDTO_s;
using CourseContentMicroService.Application.Interfaces;
using GlobalResponse.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseContentMicroService.Controllers
{
    [ApiController]
    [Route("api/instructor-quiz")]
    public class InstructorQuizController : ControllerBase
    {
        private readonly IStudentQuizService _studentQuizService;

        public InstructorQuizController(IStudentQuizService studentQuizService)
        {
            _studentQuizService = studentQuizService;
        }

        /// <summary>
        /// Get all submissions for a specific quiz
        /// </summary>
        [HttpGet("{quizId}/submissions")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<QuizSubmissionDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<QuizSubmissionDto>>>> GetSubmissionsByQuiz(int quizId)
        {
            var submissions = await _studentQuizService.GetSubmissionsByQuizAsync(quizId);
            var response = ApiResponse<IEnumerable<QuizSubmissionDto>>.SuccessResponse(
                submissions,
                "Quiz submissions retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get all completed submissions for a quiz
        /// </summary>
        [HttpGet("{quizId}/submissions/completed")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<QuizSubmissionDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<QuizSubmissionDto>>>> GetCompletedSubmissions(int quizId)
        {
            var submissions = await _studentQuizService.GetCompletedSubmissionsByQuizAsync(quizId);
            var response = ApiResponse<IEnumerable<QuizSubmissionDto>>.SuccessResponse(
                submissions,
                "Completed submissions retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get detailed submission for grading (shows all answers with correct answers)
        /// </summary>
        [HttpGet("submission/{submissionId}/for-grading")]
        [ProducesResponseType(typeof(ApiResponse<QuizSubmissionDetailDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizSubmissionDetailDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<QuizSubmissionDetailDto>>> GetSubmissionForGrading(int submissionId)
        {
            var details = await _studentQuizService.GetSubmissionDetailsAsync(submissionId);
            if (details == null)
            {
                var response = ApiResponse<QuizSubmissionDetailDto>.NotFoundResponse("Submission not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<QuizSubmissionDetailDto>.SuccessResponse(
                details,
                "Submission retrieved for grading"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Manually grade an essay answer
        /// </summary>
        [HttpPost("grade-answer")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<object>>> GradeAnswer([FromBody] GradeAnswerDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<object>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                var result = await _studentQuizService.ManualGradeAnswerAsync(dto);
                if (!result)
                {
                    var response = ApiResponse<object>.ErrorResponse(
                        "Failed to grade answer. Invalid answer ID or score exceeds question marks",
                        statusCode: 400
                    );
                    return BadRequest(response);
                }

                var successResponse = ApiResponse<object>.SuccessResponse(
                    null,
                    "Answer graded successfully"
                );
                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<object>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Grade multiple answers at once (bulk grading)
        /// </summary>
        [HttpPost("grade-multiple-answers")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<object>>> GradeMultipleAnswers([FromBody] List<GradeAnswerDto> grades)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<object>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                var failedGrades = new List<int>();
                foreach (var grade in grades)
                {
                    var result = await _studentQuizService.ManualGradeAnswerAsync(grade);
                    if (!result)
                    {
                        failedGrades.Add(grade.AnswerId);
                    }
                }

                if (failedGrades.Any())
                {
                    var response = ApiResponse<object>.ErrorResponse(
                        $"Failed to grade {failedGrades.Count} answer(s)",
                        failedGrades.Select(id => $"Answer ID: {id}").ToList(),
                        400
                    );
                    return BadRequest(response);
                }

                var successResponse = ApiResponse<object>.SuccessResponse(
                    null,
                    $"Successfully graded {grades.Count} answer(s)"
                );
                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<object>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }
    }
}
