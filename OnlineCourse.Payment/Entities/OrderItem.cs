namespace OnlineCourse.Payment.Entities
{
    public class OrderItem : BaseEntity<int>
    {
        public int OrderId { get; set; }
        public int CourseId { get; set; }
        public string CourseName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public Order Order { get; set; } = null!;
    }
}
