// ============================================================
// Order.cs - Represents a payment order made by a user
// ============================================================
// WHY THIS EXISTS:
//   When a user clicks "Buy", we create an Order BEFORE calling Paymob.
//   The Order ties together: who bought, what they bought, how much, and what happened.
//   One Order = one checkout session.
//
// RELATIONSHIPS:
//   - One Order has many OrderItems  (the courses being bought)
//   - One Order has many PaymentTransactions  (the payment attempts - could retry)

using OnlineCourse.Payment.Core.Enums;

namespace OnlineCourse.Payment.Core.Entities
{
    public class Order : BaseEntity<int>
    {
        // The ID of the user making the purchase
        // Comes from the JWT token claim (sub or nameidentifier)
        public string UserId { get; set; } = string.Empty;

        // Total price in EGP = sum of all OrderItems prices
        public decimal TotalAmount { get; set; }

        // Lifecycle: Pending → Paid (or Failed or Refunded)
        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        // The intention ID returned by Paymob when we call Create Intention API
        // We store it so we can reference this order in Paymob's system later
        public string? PaymobIntentionId { get; set; }

        // ── Navigation Properties ─────────────────────────────
        public ICollection<OrderItem> OrderItems { get; set; } = [];
        public ICollection<PaymentTransaction> Transactions { get; set; } = [];
    }
}
