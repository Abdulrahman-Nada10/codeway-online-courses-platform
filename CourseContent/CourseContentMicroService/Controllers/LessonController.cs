using CourseContentMicroService.Application.DTO_s.LessonsDTO_s;

using CourseContentMicroService.Application.Interfaces;
using CourseContentMicroService.Domain.Entities.Enums;
using GlobalResponse.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseContentMicroService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LessonController : ControllerBase
    {
        private readonly ILessonService _lessonService;

        public LessonController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        /// <summary>
        /// Get all lessons
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<LessonDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<LessonDto>>>> GetAll()
        {
            var lessons = await _lessonService.GetAllAsync();
            var response = ApiResponse<IEnumerable<LessonDto>>.SuccessResponse(
                lessons,
                "Lessons retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get a specific lesson by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ApiResponse<LessonDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<LessonDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<LessonDto>>> GetById(int id)
        {
            var lesson = await _lessonService.GetByIdAsync(id);
            if (lesson == null)
            {
                var response = ApiResponse<LessonDto>.NotFoundResponse("Lesson not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<LessonDto>.SuccessResponse(
                lesson,
                "Lesson retrieved successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Get all lessons for a specific module
        /// </summary>
        [HttpGet("module/{moduleId}")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<LessonDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<LessonDto>>>> GetLessonsByModule(int moduleId)
        {
            var lessons = await _lessonService.GetLessonsByModuleAsync(moduleId);
            var response = ApiResponse<IEnumerable<LessonDto>>.SuccessResponse(
                lessons,
                "Lessons retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get lessons by type (Video=1, PDF=2, Text=3)
        /// </summary>
        [HttpGet("type/{lessonType}")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<LessonDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<LessonDto>>>> GetLessonsByType(LessonType lessonType)
        {
            var lessons = await _lessonService.GetLessonsByTypeAsync(lessonType);
            var response = ApiResponse<IEnumerable<LessonDto>>.SuccessResponse(
                lessons,
                $"{lessonType} lessons retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get a lesson with all its quizzes
        /// </summary>
        [HttpGet("{id}/with-quizzes")]
        [ProducesResponseType(typeof(ApiResponse<LessonDetailDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<LessonDetailDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<LessonDetailDto>>> GetLessonWithQuizzes(int id)
        {
            var lesson = await _lessonService.GetLessonWithQuizzesAsync(id);
            if (lesson == null)
            {
                var response = ApiResponse<LessonDetailDto>.NotFoundResponse("Lesson not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<LessonDetailDto>.SuccessResponse(
                lesson,
                "Lesson with quizzes retrieved successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Create a new lesson
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse<LessonDto>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ApiResponse<LessonDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<LessonDto>>> Create([FromBody] CreateLessonDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<LessonDto>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                var lesson = await _lessonService.CreateAsync(dto);
                var response = ApiResponse<LessonDto>.SuccessResponse(
                    lesson,
                    "Lesson created successfully",
                    201
                );
                return CreatedAtAction(nameof(GetById), new { id = lesson.Id }, response);
            }
            catch (ArgumentException ex)
            {
                var response = ApiResponse<LessonDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Update an existing lesson
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ApiResponse<LessonDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<LessonDto>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ApiResponse<LessonDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<LessonDto>>> Update(int id, [FromBody] UpdateLessonDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<LessonDto>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                var lesson = await _lessonService.UpdateAsync(id, dto);
                if (lesson == null)
                {
                    var response = ApiResponse<LessonDto>.NotFoundResponse("Lesson not found");
                    return NotFound(response);
                }

                var successResponse = ApiResponse<LessonDto>.SuccessResponse(
                    lesson,
                    "Lesson updated successfully"
                );
                return Ok(successResponse);
            }
            catch (ArgumentException ex)
            {
                var response = ApiResponse<LessonDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Delete a lesson and all its quizzes
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
        {
            var result = await _lessonService.DeleteAsync(id);
            if (!result)
            {
                var response = ApiResponse<object>.NotFoundResponse("Lesson not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<object>.SuccessResponse(
                null,
                "Lesson deleted successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Reorder lessons within a module
        /// </summary>
        [HttpPut("module/{moduleId}/reorder")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<object>>> ReorderLessons(
            int moduleId,
            [FromBody] Dictionary<int, int> lessonOrderMap)
        {
            var result = await _lessonService.ReorderLessonsAsync(moduleId, lessonOrderMap);
            var response = ApiResponse<object>.SuccessResponse(
                null,
                "Lessons reordered successfully"
            );
            return Ok(response);
        }
    }
}
