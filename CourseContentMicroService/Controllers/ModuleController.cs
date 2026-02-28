using CourseContentMicroService.Application.DTO_s.Module_DTO_s;

using CourseContentMicroService.Application.Interfaces;
using GlobalResponse.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseContentMicroService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModuleController : ControllerBase
    {
        private readonly IModuleService _moduleService;

        public ModuleController(IModuleService moduleService)
        {
            _moduleService = moduleService;
        }

        /// <summary>
        /// Get all modules
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ModuleDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<ModuleDto>>>> GetAll()
        {
            var modules = await _moduleService.GetAllAsync();
            var response = ApiResponse<IEnumerable<ModuleDto>>.SuccessResponse(
                modules,
                "Modules retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get a specific module by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ApiResponse<ModuleDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<ModuleDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<ModuleDto>>> GetById(int id)
        {
            var module = await _moduleService.GetByIdAsync(id);
            if (module == null)
            {
                var response = ApiResponse<ModuleDto>.NotFoundResponse("Module not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<ModuleDto>.SuccessResponse(
                module,
                "Module retrieved successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Get all modules for a specific course
        /// </summary>
        [HttpGet("course/{courseId}")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ModuleDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<ModuleDto>>>> GetModulesByCourse(Guid courseId)
        {
            var modules = await _moduleService.GetModulesByCourseAsync(courseId);
            var response = ApiResponse<IEnumerable<ModuleDto>>.SuccessResponse(
                modules,
                "Modules retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get all modules with their lessons for a specific course
        /// </summary>
        [HttpGet("course/{courseId}/with-lessons")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ModuleWithLessonsDto>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<ModuleWithLessonsDto>>>> GetModulesWithLessonsByCourse(Guid courseId)
        {
            var modules = await _moduleService.GetModulesWithLessonsByCourseAsync(courseId);
            var response = ApiResponse<IEnumerable<ModuleWithLessonsDto>>.SuccessResponse(
                modules,
                "Modules with lessons retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get a module with all its lessons
        /// </summary>
        [HttpGet("{id}/with-lessons")]
        [ProducesResponseType(typeof(ApiResponse<ModuleWithLessonsDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<ModuleWithLessonsDto>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<ModuleWithLessonsDto>>> GetModuleWithLessons(int id)
        {
            var module = await _moduleService.GetModuleWithLessonsAsync(id);
            if (module == null)
            {
                var response = ApiResponse<ModuleWithLessonsDto>.NotFoundResponse("Module not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<ModuleWithLessonsDto>.SuccessResponse(
                module,
                "Module with lessons retrieved successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Create a new module
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse<ModuleDto>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ApiResponse<ModuleDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<ModuleDto>>> Create([FromBody] CreateModuleDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<ModuleDto>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                var module = await _moduleService.CreateAsync(dto);
                var response = ApiResponse<ModuleDto>.SuccessResponse(
                    module,
                    "Module created successfully",
                    201
                );
                return CreatedAtAction(nameof(GetById), new { id = module.Id }, response);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<ModuleDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Update an existing module
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ApiResponse<ModuleDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<ModuleDto>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ApiResponse<ModuleDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<ModuleDto>>> Update(int id, [FromBody] UpdateModuleDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<ModuleDto>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                var module = await _moduleService.UpdateAsync(id, dto);
                if (module == null)
                {
                    var response = ApiResponse<ModuleDto>.NotFoundResponse("Module not found");
                    return NotFound(response);
                }

                var successResponse = ApiResponse<ModuleDto>.SuccessResponse(
                    module,
                    "Module updated successfully"
                );
                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<ModuleDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
        }

        /// <summary>
        /// Delete a module and all its lessons
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
        {
            var result = await _moduleService.DeleteAsync(id);
            if (!result)
            {
                var response = ApiResponse<object>.NotFoundResponse("Module not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<object>.SuccessResponse(
                null,
                "Module deleted successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Reorder modules within a course
        /// </summary>
        [HttpPut("course/{courseId}/reorder")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<object>>> ReorderModules(
            Guid courseId,
            [FromBody] Dictionary<int, int> moduleOrderMap)
        {
            var result = await _moduleService.ReorderModulesAsync(courseId, moduleOrderMap);
            var response = ApiResponse<object>.SuccessResponse(
                null,
                "Modules reordered successfully"
            );
            return Ok(response);
        }
    }
}
