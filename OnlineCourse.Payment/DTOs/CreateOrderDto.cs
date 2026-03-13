namespace OnlineCourse.Payment.DTOs
{
    public class CreateOrderDto
    {
        // Guid because CourseManagement uses Guid as primary key
        // Source: CourseMangment.MicroService/Controllers/CourseController.cs -> GetById(Guid id)
        public List<Guid> CourseIds { get; set; } = [];
        public BillingDataDto BillingData { get; set; } = null!;
    }

    public class BillingDataDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }
}
