namespace OnlineCourse.Payment.Entities
{
    public class OrderItem : BaseEntity
    {
        public int OrderId { get; set; }

        // Course ID from CourseManagement microservice
        public int CourseId { get; set; }

        // Snapshotted at purchase time - price/name may change later
        public string CourseName { get; set; } = string.Empty;
        public decimal Price { get; set; }

        public Order Order { get; set; } = null!;
    }
}
