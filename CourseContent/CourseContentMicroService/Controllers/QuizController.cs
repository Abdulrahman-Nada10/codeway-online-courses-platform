using CourseContentMicroService.Application.DTO_s.QuizDTO_s;
using CourseContentMicroService.Application.Interfaces;
using GlobalResponse.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseContentMicroService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizController : ControllerBase
    {
        private readonly IQuizService _quizService;

        public QuizController(IQuizService quizService)
        {
            _quizService = quizService;
        }

        /// <summary>
        /// Get all quizzes
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<QuizDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<QuizDto>>>> GetAll()
        {
            var quizzes = await _quizService.GetAllAsync();
            var response = ApiResponse<IEnumerable<QuizDto>>.SuccessResponse(
                quizzes,
                "Quizzes retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get a specific quiz by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ApiResponse<QuizDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<QuizDto>>> GetById(int id)
        {
            var quiz = await _quizService.GetByIdAsync(id);
            if (quiz == null)
            {
                var response = ApiResponse<QuizDto>.NotFoundResponse("Quiz not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<QuizDto>.SuccessResponse(
                quiz,
                "Quiz retrieved successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Get all quizzes for a specific lesson
        /// </summary>
        [HttpGet("lesson/{lessonId}")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<QuizDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<QuizDto>>>> GetQuizzesByLesson(int lessonId)
        {
            var quizzes = await _quizService.GetQuizzesByLessonAsync(lessonId);
            var response = ApiResponse<IEnumerable<QuizDto>>.SuccessResponse(
                quizzes,
                "Quizzes retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get quiz with all questions
        /// </summary>
        [HttpGet("{id}/with-questions")]
        [ProducesResponseType(typeof(ApiResponse<QuizWithQuestionsDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizWithQuestionsDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<QuizWithQuestionsDto>>> GetQuizWithQuestions(int id)
        {
            var quiz = await _quizService.GetQuizWithQuestionsAsync(id);
            if (quiz == null)
            {
                var response = ApiResponse<QuizWithQuestionsDto>.NotFoundResponse("Quiz not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<QuizWithQuestionsDto>.SuccessResponse(
                quiz,
                "Quiz with questions retrieved successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Get quiz with questions and options (full details for instructor)
        /// </summary>
        [HttpGet("{id}/full-details")]
        [ProducesResponseType(typeof(ApiResponse<QuizWithQuestionsDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizWithQuestionsDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<QuizWithQuestionsDto>>> GetQuizWithQuestionsAndOptions(int id)
        {
            var quiz = await _quizService.GetQuizWithQuestionsAndOptionsAsync(id);
            if (quiz == null)
            {
                var response = ApiResponse<QuizWithQuestionsDto>.NotFoundResponse("Quiz not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<QuizWithQuestionsDto>.SuccessResponse(
                quiz,
                "Quiz details retrieved successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Get quiz summary for a student (includes completion status and score)
        /// </summary>
        [HttpGet("{quizId}/summary/student/{studentId}")]
        [ProducesResponseType(typeof(ApiResponse<QuizSummaryDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizSummaryDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<QuizSummaryDto>>> GetQuizSummaryForStudent(int quizId, Guid studentId)
        {
            var summary = await _quizService.GetQuizSummaryForStudentAsync(quizId, studentId);
            if (summary == null)
            {
                var response = ApiResponse<QuizSummaryDto>.NotFoundResponse("Quiz not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<QuizSummaryDto>.SuccessResponse(
                summary,
                "Quiz summary retrieved successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Create a new quiz
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse<QuizDto>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ApiResponse<QuizDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<QuizDto>>> Create([FromBody] CreateQuizDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<QuizDto>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                var quiz = await _quizService.CreateAsync(dto);
                var response = ApiResponse<QuizDto>.SuccessResponse(
                    quiz,
                    "Quiz created successfully",
                    201
                );
                return CreatedAtAction(nameof(GetById), new { id = quiz.Id }, response);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<QuizDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Update an existing quiz
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ApiResponse<QuizDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizDto>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ApiResponse<QuizDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<QuizDto>>> Update(int id, [FromBody] UpdateQuizDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<QuizDto>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                var quiz = await _quizService.UpdateAsync(id, dto);
                if (quiz == null)
                {
                    var response = ApiResponse<QuizDto>.NotFoundResponse("Quiz not found");
                    return NotFound(response);
                }

                var successResponse = ApiResponse<QuizDto>.SuccessResponse(
                    quiz,
                    "Quiz updated successfully"
                );
                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<QuizDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Delete a quiz
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
        {
            var result = await _quizService.DeleteAsync(id);
            if (!result)
            {
                var response = ApiResponse<object>.NotFoundResponse("Quiz not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<object>.SuccessResponse(
                null,
                "Quiz deleted successfully"
            );
            return Ok(successResponse);
        }
    }
}
