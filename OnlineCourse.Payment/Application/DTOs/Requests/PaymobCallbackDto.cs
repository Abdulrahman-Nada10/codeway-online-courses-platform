// ============================================================
// PaymobCallbackDto.cs - Maps the Paymob webhook POST body
// ============================================================
// WHY THIS EXISTS:
//   After a payment completes (success or fail), Paymob sends a POST request
//   to your callback URL with the full transaction details.
//   This DTO maps that JSON body so we can read it in C#.
//
// !! SECURITY WARNING !!
//   NEVER process this callback without first validating the HMAC.
//   Anyone could POST a fake success callback to your endpoint.
//   Always call IPaymobService.ValidateHmac() BEFORE doing anything.
//
// HOW TO SET CALLBACK URL IN PAYMOB DASHBOARD:
//   accept.paymob.com → Developers → Payment Integrations → Edit
//   → Transaction Processed Callback = https://yourdomain.com/api/payment/callback

namespace OnlineCourse.Payment.Application.DTOs.Requests
{
    public class PaymobCallbackDto
    {
        // The transaction details from Paymob
        public PaymobTransactionObj? Obj { get; set; }

        // HMAC hash sent by Paymob - verifies the callback is genuine
        public string? Hmac { get; set; }
    }

    // Maps the "obj" field inside Paymob's callback JSON
    public class PaymobTransactionObj
    {
        // Unique Paymob transaction ID - store in PaymentTransaction.PaymobTransactionId
        public long Id { get; set; }

        // true = payment succeeded, false = payment failed
        public bool Success { get; set; }

        // true = transaction was voided after authorization
        public bool IsVoided { get; set; }

        // Amount in CENTS (e.g. 50000 = 500.00 EGP). Divide by 100 to get EGP.
        public long AmountCents { get; set; }

        // The merchant_order_id we sent when creating the Paymob intention
        // = our Order.Id.ToString() → use this to find the right Order in our DB
        public string? MerchantOrderId { get; set; }

        // Payment method: "card", "wallet", "kiosk"
        public string? SourceDataType { get; set; }

        // When Paymob processed this transaction
        public DateTime CreatedAt { get; set; }
    }
}
