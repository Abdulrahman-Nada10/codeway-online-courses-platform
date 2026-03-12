using OnlineCourse.Payment.Entities.Enums;

namespace OnlineCourse.Payment.Entities
{
    public class Order : BaseEntity
    {
        // From JWT claim (sub / nameidentifier)
        public string UserId { get; set; } = string.Empty;

        // Sum of all OrderItems prices
        public decimal TotalAmount { get; set; }

        // Pending -> Paid / Failed / Refunded
        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        // Intention ID returned by Paymob - stored for reference
        public string? PaymobIntentionId { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; } = [];
        public ICollection<PaymentTransaction> Transactions { get; set; } = [];
    }
}
