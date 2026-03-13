namespace OnlineCourse.Payment.Entities
{
    public class OrderItem : BaseEntity
    {
        public int OrderId { get; set; }

        // Guid because CourseManagement uses Guid as primary key
        public Guid CourseId { get; set; }

        // Snapshotted at purchase time - course price/name can change later
        // but we store what the user actually paid for
        public string CourseName { get; set; } = string.Empty;
        public decimal Price { get; set; }

        public Order Order { get; set; } = null!;
    }
}
