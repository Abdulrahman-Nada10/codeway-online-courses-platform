using OnlineCourse.Payment.Entities.Enums;

namespace OnlineCourse.Payment.Entities
{
    public class PaymentTransaction : BaseEntity<int>
    {
        public int OrderId { get; set; }
        public long PaymobTransactionId { get; set; }
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public DateTime? PaidAt { get; set; }
        public string? RawCallbackData { get; set; }
        public Order Order { get; set; } = null!;
    }
}
