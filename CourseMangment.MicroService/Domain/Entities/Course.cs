using CourseMangment.MicroService.Domain.Enums;

namespace CourseMangment.MicroService.Domain.Entities
{
    public class Course : BaseEntity<Guid>
    {

        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public decimal? Price { get; set; }

        public int Duration { get; set; } // Duration in hours
        public CourseLevel Level { get; set; }  // e.g., Beginner, Intermediate, Advanced

        public CourseStatus Status { get; set; }  // e.g., Draft, Published

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;

        public int CategoryId { get; set; }

        // Navigation property

        public Category Category { get; set; }


    }
}
