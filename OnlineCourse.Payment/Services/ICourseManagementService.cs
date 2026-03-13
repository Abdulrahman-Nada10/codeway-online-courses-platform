namespace OnlineCourse.Payment.Services
{
    // WHY THIS EXISTS:
    // Payment service needs course Title + Price to build OrderItems.
    // It gets them by calling CourseManagement's GET api/Course/{id}.
    // We forward the user's JWT because CourseManagement has [Authorize].
    // Without forwarding the token, CourseManagement returns 401.
    public interface ICourseManagementService
    {
        Task<CourseInfoDto?> GetCourseByIdAsync(Guid courseId, string userToken);
    }

    // Lightweight DTO - we only need Id, Title, Price from the full CourseDto
    // Source: CourseMangment.MicroService/Application/DTO's/CourseDto.cs
    public class CourseInfoDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        // Nullable because CourseDto.Price is decimal?
        // If null we treat it as 0 (free course)
        public decimal? Price { get; set; }
    }
}
