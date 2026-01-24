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
        /// Get submission details for grading (instructor view)
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
        /// Grade an essay answer (instructor only)
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
    }
}
