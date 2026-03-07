// ============================================================
// OrderResponseDto.cs - What we return to frontend for an order
// ============================================================
// WHY THIS EXISTS:
//   Never return raw Entity objects to the frontend.
//   This DTO exposes only the safe, relevant fields.
//   AutoMapper converts Order → OrderResponseDto automatically.

namespace OnlineCourse.Payment.Application.DTOs.Responses
{
    public class OrderResponseDto
    {
        public int Id { get; set; }
        public decimal TotalAmount { get; set; }

        // Status as readable string: "Pending", "Paid", "Failed", "Refunded"
        public string Status { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        // The courses included in this order
        public List<OrderItemResponseDto> Items { get; set; } = [];
    }

    public class OrderItemResponseDto
    {
        public int CourseId { get; set; }
        public string CourseName { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}
