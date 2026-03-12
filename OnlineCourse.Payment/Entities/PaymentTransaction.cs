using OnlineCourse.Payment.Entities.Enums;

namespace OnlineCourse.Payment.Entities
{
    public class PaymentTransaction : BaseEntity
    {
        public int OrderId { get; set; }

        // Unique transaction ID from Paymob webhook callback
        public long PaymobTransactionId { get; set; }

        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;

        // Paymob sends amount in cents - store in EGP (divide by 100)
        public decimal Amount { get; set; }

        // "card", "wallet", "kiosk"
        public string PaymentMethod { get; set; } = string.Empty;

        public DateTime? PaidAt { get; set; }

        // Full raw JSON from Paymob callback for audit/debugging
        public string? RawCallbackData { get; set; }

        public Order Order { get; set; } = null!;
    }
}
