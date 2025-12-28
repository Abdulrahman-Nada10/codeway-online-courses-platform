using CourseMangment.MicroService.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace CourseMangment.MicroService.Application.DTO_s
{
    public class UpdateCourseDto
    {
        // ID comes from route parameter, not body
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
        public string Title { get; set; } = null!;

        [MaxLength(2000, ErrorMessage = "Description cannot exceed 2000 characters")]
        public string? Description { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Price must be positive")]
        public decimal? Price { get; set; }

        [Required(ErrorMessage = "Category is required")]
        public int CategoryId { get; set; }

        [Range(1, 1000, ErrorMessage = "Duration must be between 1 and 1000 hours")]
        public int Duration { get; set; }

        [Required(ErrorMessage = "Level is required")]
        [RegularExpression("^(Beginner|Intermediate|Advanced)$",
            ErrorMessage = "Level must be Beginner, Intermediate, or Advanced")]
        public CourseLevel Level { get; set; } 

        [RegularExpression("^(Draft|Published)$",
            ErrorMessage = "Status must be Draft or Published")]

        [Required]
        public CourseStatus Status { get; set; } 
    }
}
