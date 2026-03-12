namespace OnlineCourse.Payment.DTOs
{
    public class CreateOrderDto
    {
        // Course IDs to purchase - prices fetched from CourseManagement service
        public List<int> CourseIds { get; set; } = [];
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
