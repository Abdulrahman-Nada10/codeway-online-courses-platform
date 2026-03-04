using CourseContentMicroService.Application.DTO_s.OptionsDTO_s;
using CourseContentMicroService.Application.DTO_s.QuizQuestionsDTO_s;
using CourseContentMicroService.Application.Interfaces;
using GlobalResponse.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseContentMicroService.Controllers
{
    [ApiController]
    [Authorize]

    [Route("api/quiz-question")]
    public class QuizQuestionController : ControllerBase
    {
        private readonly IQuizQuestionService _questionService;

        public QuizQuestionController(IQuizQuestionService questionService)
        {
            _questionService = questionService;
        }

        /// <summary>
        /// Get a specific question by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ApiResponse<QuizQuestionDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizQuestionDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<QuizQuestionDto>>> GetById(int id)
        {
            var question = await _questionService.GetByIdAsync(id);
            if (question == null)
            {
                var response = ApiResponse<QuizQuestionDto>.NotFoundResponse("Question not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<QuizQuestionDto>.SuccessResponse(
                question,
                "Question retrieved successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Get all questions for a specific quiz
        /// </summary>
        [HttpGet("quiz/{quizId}")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<QuizQuestionDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<QuizQuestionDto>>>> GetQuestionsByQuiz(int quizId)
        {
            var questions = await _questionService.GetQuestionsByQuizAsync(quizId);
            var response = ApiResponse<IEnumerable<QuizQuestionDto>>.SuccessResponse(
                questions,
                "Questions retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get all questions with options for a quiz
        /// </summary>
        [HttpGet("quiz/{quizId}/with-options")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<QuizQuestionWithOptionsDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<QuizQuestionWithOptionsDto>>>> GetQuestionsWithOptionsByQuiz(int quizId)
        {
            var questions = await _questionService.GetQuestionsWithOptionsByQuizAsync(quizId);
            var response = ApiResponse<IEnumerable<QuizQuestionWithOptionsDto>>.SuccessResponse(
                questions,
                "Questions with options retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get a question with all its options
        /// </summary>
        [HttpGet("{id}/with-options")]
        [ProducesResponseType(typeof(ApiResponse<QuizQuestionWithOptionsDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizQuestionWithOptionsDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<QuizQuestionWithOptionsDto>>> GetQuestionWithOptions(int id)
        {
            var question = await _questionService.GetQuestionWithOptionsAsync(id);
            if (question == null)
            {
                var response = ApiResponse<QuizQuestionWithOptionsDto>.NotFoundResponse("Question not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<QuizQuestionWithOptionsDto>.SuccessResponse(
                question,
                "Question with options retrieved successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Create a new question (with or without options)
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse<QuizQuestionDto>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ApiResponse<QuizQuestionDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<QuizQuestionDto>>> Create([FromBody] CreateQuizQuestionDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<QuizQuestionDto>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                var question = await _questionService.CreateAsync(dto);
                var response = ApiResponse<QuizQuestionDto>.SuccessResponse(
                    question,
                    "Question created successfully",
                    201
                );
                return CreatedAtAction(nameof(GetById), new { id = question.Id }, response);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<QuizQuestionDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Add options to an existing question
        /// </summary>
        [HttpPost("{questionId}/options")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<object>>> AddOptionsToQuestion(
            int questionId,
            [FromBody] IEnumerable<CreateQuizQuestionOptionDto> options)
        {
            try
            {
                var result = await _questionService.AddOptionsToQuestionAsync(questionId, options);
                if (!result)
                {
                    var response = ApiResponse<object>.ErrorResponse(
                        "Failed to add options. Invalid question or validation failed",
                        statusCode: 400
                    );
                    return BadRequest(response);
                }

                var successResponse = ApiResponse<object>.SuccessResponse(
                    null,
                    "Options added successfully"
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
        /// Update an existing question
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ApiResponse<QuizQuestionDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<QuizQuestionDto>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ApiResponse<QuizQuestionDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<QuizQuestionDto>>> Update(int id, [FromBody] UpdateQuizQuestionDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<QuizQuestionDto>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                var question = await _questionService.UpdateAsync(id, dto);
                if (question == null)
                {
                    var response = ApiResponse<QuizQuestionDto>.NotFoundResponse("Question not found");
                    return NotFound(response);
                }

                var successResponse = ApiResponse<QuizQuestionDto>.SuccessResponse(
                    question,
                    "Question updated successfully"
                );
                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<QuizQuestionDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Delete a question
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
        {
            var result = await _questionService.DeleteAsync(id);
            if (!result)
            {
                var response = ApiResponse<object>.NotFoundResponse("Question not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<object>.SuccessResponse(
                null,
                "Question deleted successfully"
            );
            return Ok(successResponse);
        }
    }
}
