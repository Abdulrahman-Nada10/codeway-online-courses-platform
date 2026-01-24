using CourseContentMicroService.Application.DTO_s.AnswersDTO_s;
using CourseContentMicroService.Application.DTO_s.SubmissionDTO_s;

using CourseContentMicroService.Application.Interfaces;
using GlobalResponse.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseContentMicroService.Controllers
{
    [ApiController]
    [Route("api/student-quiz")]
    public class StudentQuizController : ControllerBase
    {
        private readonly IStudentQuizService _studentQuizService;

        public StudentQuizController(IStudentQuizService studentQuizService)
        {
            _studentQuizService = studentQuizService;
        }

        /// <summary>
        /// Start a quiz attempt
        /// </summary>
        [HttpPost("start")]
        [ProducesResponseType(typeof(ApiResponse<QuizSubmissionDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizSubmissionDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<QuizSubmissionDto>>> StartQuiz([FromBody] StartQuizDto dto)
        {
            try
            {
                var submission = await _studentQuizService.StartQuizAsync(dto);
                var response = ApiResponse<QuizSubmissionDto>.SuccessResponse(
                    submission,
                    "Quiz started successfully"
                );
                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<QuizSubmissionDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Get active submission for a student on a specific quiz
        /// </summary>
        [HttpGet("active/{quizId}/student/{studentId}")]
        [ProducesResponseType(typeof(ApiResponse<QuizSubmissionDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizSubmissionDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<QuizSubmissionDto>>> GetActiveSubmission(int quizId, Guid studentId)
        {
            var submission = await _studentQuizService.GetActiveSubmissionAsync(quizId, studentId);
            if (submission == null)
            {
                var response = ApiResponse<QuizSubmissionDto>.NotFoundResponse("No active submission found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<QuizSubmissionDto>.SuccessResponse(
                submission,
                "Active submission retrieved successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Get all quiz submissions for a student
        /// </summary>
        [HttpGet("student/{studentId}/submissions")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<QuizSubmissionDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<QuizSubmissionDto>>>> GetSubmissionsByStudent(Guid studentId)
        {
            var submissions = await _studentQuizService.GetSubmissionsByStudentAsync(studentId);
            var response = ApiResponse<IEnumerable<QuizSubmissionDto>>.SuccessResponse(
                submissions,
                "Submissions retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get incomplete quiz submissions for a student
        /// </summary>
        [HttpGet("student/{studentId}/incomplete")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<QuizSubmissionDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<QuizSubmissionDto>>>> GetIncompleteSubmissions(Guid studentId)
        {
            var submissions = await _studentQuizService.GetIncompleteSubmissionsAsync(studentId);
            var response = ApiResponse<IEnumerable<QuizSubmissionDto>>.SuccessResponse(
                submissions,
                "Incomplete submissions retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Submit an answer to a question
        /// </summary>
        [HttpPost("submit-answer")]
        [ProducesResponseType(typeof(ApiResponse<QuizAnswerDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizAnswerDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<QuizAnswerDto>>> SubmitAnswer([FromBody] SubmitAnswerDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<QuizAnswerDto>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                var answer = await _studentQuizService.SubmitAnswerAsync(dto);
                var response = ApiResponse<QuizAnswerDto>.SuccessResponse(
                    answer,
                    "Answer submitted successfully"
                );
                return Ok(response);
            }
            catch (InvalidOperationException ex)
            {
                var response = ApiResponse<QuizAnswerDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
            catch (ArgumentException ex)
            {
                var response = ApiResponse<QuizAnswerDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Update a previously submitted answer (before quiz completion)
        /// </summary>
        [HttpPut("update-answer/{answerId}")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<object>>> UpdateAnswer(int answerId, [FromBody] SubmitAnswerDto dto)
        {
            try
            {
                var result = await _studentQuizService.UpdateAnswerAsync(answerId, dto);
                if (!result)
                {
                    var response = ApiResponse<object>.ErrorResponse(
                        "Failed to update answer. Submission may be completed or answer not found",
                        statusCode: 400
                    );
                    return BadRequest(response);
                }

                var successResponse = ApiResponse<object>.SuccessResponse(
                    null,
                    "Answer updated successfully"
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
        /// Complete and submit the quiz
        /// </summary>
        [HttpPost("complete/{submissionId}")]
        [ProducesResponseType(typeof(ApiResponse<QuizSubmissionDetailDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizSubmissionDetailDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<QuizSubmissionDetailDto>>> CompleteQuiz(int submissionId)
        {
            try
            {
                var result = await _studentQuizService.CompleteQuizAsync(submissionId);
                if (result == null)
                {
                    var response = ApiResponse<QuizSubmissionDetailDto>.ErrorResponse(
                        "Submission not found or already completed",
                        statusCode: 400
                    );
                    return BadRequest(response);
                }

                var successResponse = ApiResponse<QuizSubmissionDetailDto>.SuccessResponse(
                    result,
                    "Quiz completed successfully"
                );
                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<QuizSubmissionDetailDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Get submission details with all answers and scores
        /// </summary>
        [HttpGet("submission/{submissionId}/details")]
        [ProducesResponseType(typeof(ApiResponse<QuizSubmissionDetailDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizSubmissionDetailDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<QuizSubmissionDetailDto>>> GetSubmissionDetails(int submissionId)
        {
            var details = await _studentQuizService.GetSubmissionDetailsAsync(submissionId);
            if (details == null)
            {
                var response = ApiResponse<QuizSubmissionDetailDto>.NotFoundResponse("Submission not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<QuizSubmissionDetailDto>.SuccessResponse(
                details,
                "Submission details retrieved successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Manually grade an essay answer (instructor only)
        /// </summary>
        [HttpPost("grade-answer")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<object>>> ManualGradeAnswer([FromBody] GradeAnswerDto dto)
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
                        "Failed to grade answer. Invalid answer or score exceeds question marks",
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
    }
}
