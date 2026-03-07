// ============================================================
// PaymentStatus.cs - Lifecycle states of a PaymentTransaction
// ============================================================
// Pending → Transaction exists but no result yet from Paymob
// Success → Paymob confirmed the payment was charged successfully
// Failed  → Payment was declined or errored
// Voided  → Transaction was cancelled after authorization

namespace OnlineCourse.Payment.Core.Enums
{
    public enum PaymentStatus
    {
        Pending = 0,
        Success = 1,
        Failed = 2,
        Voided = 3
    }
}
