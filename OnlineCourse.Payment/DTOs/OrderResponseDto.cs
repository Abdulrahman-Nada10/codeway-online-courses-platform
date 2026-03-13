namespace OnlineCourse.Payment.DTOs
{
    public class OrderResponseDto
    {
        public int Id { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public List<OrderItemResponseDto> Items { get; set; } = [];
    }

    public class OrderItemResponseDto
    {
        // Guid because OrderItem.CourseId is Guid (CourseManagement uses Guid PKs)
        public Guid CourseId { get; set; }
        public string CourseName { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}
