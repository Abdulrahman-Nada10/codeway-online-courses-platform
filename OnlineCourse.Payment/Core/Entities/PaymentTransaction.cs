// ============================================================
// PaymentTransaction.cs - A single payment attempt
// ============================================================
// WHY THIS EXISTS:
//   A user might attempt to pay and fail, then retry.
//   Each attempt = one PaymentTransaction row.
//   We CREATE this when Paymob sends us the webhook callback.
//
// HOW IT GETS CREATED:
//   1. User initiates payment (Order is created with Status=Pending)
//   2. Paymob processes payment
//   3. Paymob POSTs to /api/payment/callback
//   4. We validate HMAC, then create this PaymentTransaction
//   5. We also update Order.Status based on success/failure
//
// AUDIT/DEBUGGING:
//   We store the full raw JSON from Paymob in RawCallbackData
//   so we can always investigate payment issues.

using OnlineCourse.Payment.Core.Enums;

namespace OnlineCourse.Payment.Core.Entities
{
    public class PaymentTransaction : BaseEntity<int>
    {
        // FK to Order
        public int OrderId { get; set; }

        // The unique transaction ID assigned by Paymob (comes in webhook callback)
        public long PaymobTransactionId { get; set; }

        // Pending → Success / Failed / Voided
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;

        // Amount paid in EGP (Paymob sends in cents - divide by 100)
        public decimal Amount { get; set; }

        // Payment method used: "card", "wallet", "kiosk", "installment"
        public string PaymentMethod { get; set; } = string.Empty;

        // Filled only when payment succeeds
        public DateTime? PaidAt { get; set; }

        // Full raw JSON from Paymob callback - stored for debugging/audit trail
        public string? RawCallbackData { get; set; }

        // ── Navigation ────────────────────────────────────────
        public Order Order { get; set; } = null!;
    }
}
