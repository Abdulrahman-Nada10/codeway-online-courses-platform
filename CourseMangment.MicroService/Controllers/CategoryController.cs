// Controllers/CategoryController.cs
using CourseMangment.MicroService.Application.DTO_s;
using CourseMangment.MicroService.Domain.Entities;
using CourseMangment.MicroService.Domain.UnitOfWork;
using GlobalResponse.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseMangment.MicroService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly IUOW _unitOfWork;

        public CategoryController(IUOW unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Get all categories
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<Category>>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResponse<IEnumerable<Category>>>> GetAll()
        {
            var repo = _unitOfWork.GetRepository<Category, int>();
            var categories = await repo.GetAllAsync();

            var response = ApiResponse<IEnumerable<Category>>.SuccessResponse(
                categories,
                "Categories retrieved successfully"
            );
            return Ok(response);
        }

        /// <summary>
        /// Get a specific category by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ApiResponse<Category>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<Category>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<Category>>> GetById(int id)
        {
            var repo = _unitOfWork.GetRepository<Category, int>();
            var category = await repo.GetByIdAsync(id);

            if (category == null)
            {
                var response = ApiResponse<Category>.NotFoundResponse("Category not found");
                return NotFound(response);
            }

            var successResponse = ApiResponse<Category>.SuccessResponse(
                category,
                "Category retrieved successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Create a new category
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse<Category>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ApiResponse<Category>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<Category>>> Create([FromBody] CreateCategoryDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<Category>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            var repo = _unitOfWork.GetRepository<Category, int>();

            var category = new Category
            {
                Name = dto.Name,
                Description = dto.Description
            };

            await repo.CreateAsync(category);
            await _unitOfWork.SaveChangesAsync();

            var response = ApiResponse<Category>.SuccessResponse(
                category,
                "Category created successfully",
                201
            );
            return CreatedAtAction(nameof(GetById), new { id = category.Id }, response);
        }

        /// <summary>
        /// Update an existing category
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ApiResponse<Category>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<Category>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ApiResponse<Category>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ApiResponse<Category>>> Update(int id, [FromBody] UpdateCategoryDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var errorResponse = ApiResponse<Category>.ErrorResponse(
                    "Validation failed",
                    errors,
                    400
                );
                return BadRequest(errorResponse);
            }

            var repo = _unitOfWork.GetRepository<Category, int>();
            var category = await repo.GetByIdAsync(id);

            if (category == null)
            {
                var response = ApiResponse<Category>.NotFoundResponse("Category not found");
                return NotFound(response);
            }

            category.Name = dto.Name;
            category.Description = dto.Description;

            repo.update(category);
            await _unitOfWork.SaveChangesAsync();

            var successResponse = ApiResponse<Category>.SuccessResponse(
                category,
                "Category updated successfully"
            );
            return Ok(successResponse);
        }

        /// <summary>
        /// Delete a category
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
        {
            var repo = _unitOfWork.GetRepository<Category, int>();
            var category = await repo.GetByIdAsync(id);

            if (category == null)
            {
                var response = ApiResponse<object>.NotFoundResponse("Category not found");
                return NotFound(response);
            }

            repo.delete(category);
            await _unitOfWork.SaveChangesAsync();

            var successResponse = ApiResponse<object>.SuccessResponse(
                null,
                "Category deleted successfully"
            );
            return Ok(successResponse);
        }
    }
}
