// ============================================================
// OrderStatus.cs - Lifecycle states of an Order
// ============================================================
// Pending  → Order created, waiting for user to pay
// Paid     → Paymob webhook confirmed successful payment
// Failed   → Paymob webhook reported failure (wrong card, insufficient funds, etc.)
// Refunded → Payment was reversed (future feature)

namespace OnlineCourse.Payment.Core.Enums
{
    public enum OrderStatus
    {
        Pending = 0,
        Paid = 1,
        Failed = 2,
        Refunded = 3
    }
}
