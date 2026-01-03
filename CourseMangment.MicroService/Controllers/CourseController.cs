// Controllers/CourseController.cs
using CourseMangment.MicroService.Application.DTO_s;
using CourseMangment.MicroService.Application.interfaces;
using CourseMangment.MicroService.Domain.Entities;
using CourseMangment.MicroService.Domain.Enums;
using GlobalResponse.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseMangment.MicroService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        /// <summary>
        /// Get all courses (not deleted)
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<CourseDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<CourseDto>>>> GetAll()
        {
            var courses = await _courseService.GetAllCoursesAsync();
            var response = ApiResponse<IEnumerable<CourseDto>>.SuccessResponse(
                courses,
                "Courses retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get a specific course by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ApiResponse<CourseDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<CourseDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<CourseDto>>> GetById(Guid id)
        {
            try
            {
                var course = await _courseService.GetCourseByIdAsync(id);
                var response = ApiResponse<CourseDto>.SuccessResponse(
                    course,
                    "Course retrieved successfully"
                );
                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                var response = ApiResponse<CourseDto>.NotFoundResponse(ex.Message);
                return NotFound(response);
            }
        }

        /// <summary>
        /// Get all published courses
        /// </summary>
        [HttpGet("published")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<CourseDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<CourseDto>>>> GetPublished()
        {
            var courses = await _courseService.GetPublishedCoursesAsync();
            var response = ApiResponse<IEnumerable<CourseDto>>.SuccessResponse(
                courses,
                "Published courses retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get all draft courses
        /// </summary>
        [HttpGet("drafts")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<CourseDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<CourseDto>>>> GetDrafts()
        {
            var courses = await _courseService.GetDraftCoursesAsync();
            var response = ApiResponse<IEnumerable<CourseDto>>.SuccessResponse(
                courses,
                "Draft courses retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get courses by category
        /// </summary>
        [HttpGet("category/{categoryId}")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<CourseDto>>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<CourseDto>>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<IEnumerable<CourseDto>>>> GetByCategory(int categoryId)
        {
            try
            {
                var courses = await _courseService.GetCoursesByCategoryAsync(categoryId);
                var response = ApiResponse<IEnumerable<CourseDto>>.SuccessResponse(
                    courses,
                    $"Courses for category {categoryId} retrieved successfully"
                );
                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                var response = ApiResponse<IEnumerable<CourseDto>>.ErrorResponse(
                    ex.Message,
                    statusCode: 400
                );
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Get courses by level (1=Beginner, 2=Intermediate, 3=Advanced)
        /// </summary>
        [HttpGet("level/{level}")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<CourseDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<CourseDto>>>> GetByLevel(CourseLevel level)
        {
            var courses = await _courseService.GetCoursesByLevelAsync(level);
            var response = ApiResponse<IEnumerable<CourseDto>>.SuccessResponse(
                courses,
                $"{level} courses retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Search courses by title or description
        /// </summary>
        [HttpGet("search")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<CourseDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<CourseDto>>>> Search([FromQuery] string term)
        {
            var courses = await _courseService.SearchCoursesAsync(term);
            var response = ApiResponse<IEnumerable<CourseDto>>.SuccessResponse(
                courses,
                $"Search results for '{term}'"
            );
            return Ok(response);
        }

        /// <summary>
        /// Filter courses by price range
        /// </summary>
        [HttpGet("price")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<CourseDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<CourseDto>>>> GetByPriceRange(
            [FromQuery] decimal? min,
            [FromQuery] decimal? max)
        {
            var courses = await _courseService.GetCoursesByPriceRangeAsync(min, max);
            var response = ApiResponse<IEnumerable<CourseDto>>.SuccessResponse(
                courses,
                "Courses filtered by price range"
            );
            return Ok(response);
        }

        /// <summary>
        /// Create a new course
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse<CourseDto>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ApiResponse<CourseDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<CourseDto>>> Create([FromBody] CreateCourseDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<CourseDto>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                //  Check for duplicate course title
                var existingCourses = await _courseService.GetAllCoursesAsync();
                var duplicateCourse = existingCourses.FirstOrDefault(c =>
                    c.Title.Trim().ToLower() == dto.Title.Trim().ToLower());

                if (duplicateCourse != null)
                {
                    var duplicateResponse = ApiResponse<CourseDto>.ErrorResponse(
                        $"Course with title '{dto.Title}' already exists",
                        new List<string> { "A course with this title is already in the system" },
                        400
                    );
                    return BadRequest(duplicateResponse);
                }

                var course = await _courseService.CreateAsync(dto);
                var response = ApiResponse<CourseDto>.SuccessResponse(
                    course,
                    "Course created successfully",
                    201
                );
                return CreatedAtAction(nameof(GetById), new { id = course.Id }, response);
            }
            catch (ArgumentException ex)
            {
                var response = ApiResponse<CourseDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }
        /// <summary>
        /// Update an existing course
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ApiResponse<CourseDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<CourseDto>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ApiResponse<CourseDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<CourseDto>>> Update(Guid id, [FromBody] UpdateCourseDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<CourseDto>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                //  Check if new title conflicts with another course
                var existingCourses = await _courseService.GetAllCoursesAsync();
                var duplicateCourse = existingCourses.FirstOrDefault(c =>
                    c.Title.Trim().ToLower() == dto.Title.Trim().ToLower() && c.Id != id);

                if (duplicateCourse != null)
                {
                    var duplicateResponse = ApiResponse<CourseDto>.ErrorResponse(
                        $"Another course with title '{dto.Title}' already exists",
                        new List<string> { "Cannot update to a title that is already in use" },
                        400
                    );
                    return BadRequest(duplicateResponse);
                }

                var course = await _courseService.UpdateAsync(id, dto);

                if (course == null)
                {
                    var response = ApiResponse<CourseDto>.NotFoundResponse(
                        "Course not found or has been deleted"
                    );
                    return NotFound(response);
                }

                var successResponse = ApiResponse<CourseDto>.SuccessResponse(
                    course,
                    "Course updated successfully"
                );
                return Ok(successResponse);
            }
            catch (ArgumentException ex)
            {
                var response = ApiResponse<CourseDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }
        /// <summary>
        /// Delete a course (soft delete)
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<object>>> Delete(Guid id)
        {
            var result = await _courseService.DeleteAsync(id);

            if (!result)
            {
                var response = ApiResponse<object>.NotFoundResponse(
                    "Course not found or already deleted"
                );
                return NotFound(response);
            }

            var successResponse = ApiResponse<object>.SuccessResponse(
                null,
                "Course deleted successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Publish a draft course
        /// </summary>
        [HttpPut("{id}/publish")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<object>>> Publish(Guid id)
        {
            try
            {
                var result = await _courseService.PublishCourseAsync(id);

                if (!result)
                {
                    var response = ApiResponse<object>.NotFoundResponse(
                        "Course not found or already published"
                    );
                    return NotFound(response);
                }

                var successResponse = ApiResponse<object>.SuccessResponse(
                    null,
                    "Course published successfully"
                );
                return Ok(successResponse);
            }
            catch (InvalidOperationException ex)
            {
                var response = ApiResponse<object>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Unpublish a course (change back to draft)
        /// </summary>
        [HttpPut("{id}/unpublish")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<object>>> Unpublish(Guid id)
        {
            var result = await _courseService.UnpublishCourseAsync(id);

            if (!result)
            {
                var response = ApiResponse<object>.NotFoundResponse(
                    "Course not found or already in draft status"
                );
                return NotFound(response);
            }

            var successResponse = ApiResponse<object>.SuccessResponse(
                null,
                "Course unpublished successfully"
            );
            return Ok(successResponse);
        }
        /// <summary>
        /// Search, filter and paginate courses
        /// </summary>
        [HttpGet("filter")]
        [ProducesResponseType(typeof(ApiResponse<PagedResultDto<CourseDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<PagedResultDto<CourseDto>>>> GetWithFilter(
            [FromQuery] CourseQueryParameters query)
        {
            var result = await _courseService.GetCoursesWithFilterAsync(query);

            var response = ApiResponse<PagedResultDto<CourseDto>>.SuccessResponse(
                result,
                "Courses filtered successfully"
            );

            return Ok(response);
        }

    }
}
