using OnlineCourse.Payment.Entities.Enums;

namespace OnlineCourse.Payment.Entities
{
    public class Order : BaseEntity<int>
    {
        public string UserId { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string? PaymobIntentionId { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } = [];
        public ICollection<PaymentTransaction> Transactions { get; set; } = [];
    }
}
