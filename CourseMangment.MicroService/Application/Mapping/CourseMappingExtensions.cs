using CourseMangment.MicroService.Application.DTO_s;
using CourseMangment.MicroService.Domain.Entities;

namespace CourseMangment.MicroService.Application.Mapping
{
    public static class CourseMappingExtensions
    {
        // Mapping methods would go here
        public static CourseDto ToCourseDto(this Course course)
        {
            return new CourseDto
            {
                Id = course.Id,
                Title = course.Title,
                Description = course.Description,
                Price = course.Price,
                Duration = course.Duration,
                Level = course.Level,
                Status = course.Status,
                CategoryId = course.CategoryId,
                CategoryName = course.Category?.Name ?? "Unknown",
                CreatedAt = course.CreatedAt,
                UpdatedAt = course.UpdatedAt,
                ///
                Rating = course.Rating,                 // 
                EnrollmentsCount = course.EnrollmentsCount // 
            };
        
        }
        // CreateCourseDto → Course
        public static Course ToEntity(this CreateCourseDto dto)
        {
            return new Course
            {
                Id = Guid.NewGuid(), // Generate new ID
                Title = dto.Title,
                Description = dto.Description,
                Price = dto.Price,
                Duration = dto.Duration,
                Level = dto.Level,
                Status = dto.Status,
                CategoryId = dto.CategoryId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false
            };
        }
        // UpdateCourseDto → Update existing Course entity
        public static void UpdateFromDto(this Course course, UpdateCourseDto dto)
        {
            course.Title = dto.Title;
            course.Description = dto.Description;
            course.Price = dto.Price;
            course.Duration = dto.Duration;
            course.Level = dto.Level;
            course.Status = dto.Status;
            course.CategoryId = dto.CategoryId;
            course.UpdatedAt = DateTime.UtcNow;
        }
        // List mapping helpers
        public static IEnumerable<CourseDto> ToCourseDtoList(this IEnumerable<Course> courses)
        {
            return courses.Select(c => c.ToCourseDto());
        }

    }
}
