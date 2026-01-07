using CourseMangment.MicroService.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace CourseMangment.MicroService.Application.DTO_s
{
    public class CourseDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public int Duration { get; set; }
        
        public CourseLevel Level { get; set; } 
        public CourseStatus Status { get; set; }

        public string LevelName => Level.ToString();
        public string StatusName => Status.ToString();

        // Category information
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = null!;

        // Metadata
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public double Rating { get; set; }          //
        public int EnrollmentsCount { get; set; }   //
    }
}
