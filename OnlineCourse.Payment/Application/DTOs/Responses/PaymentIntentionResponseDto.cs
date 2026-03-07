// ============================================================
// PaymentIntentionResponseDto.cs - Returned after creating a payment
// ============================================================
// WHY THIS EXISTS:
//   After the backend calls Paymob Create Intention API,
//   Paymob returns a "client_secret".
//   The frontend needs BOTH client_secret AND public_key
//   to open the Paymob checkout popup using Paymob's JS SDK.
//
// FRONTEND USAGE:
//   const paymob = Paymob.init({ publicKey: response.publicKey });
//   paymob.pay({ clientSecret: response.clientSecret });

namespace OnlineCourse.Payment.Application.DTOs.Responses
{
    public class PaymentIntentionResponseDto
    {
        // Our internal order ID - frontend uses this to track the order
        public int OrderId { get; set; }

        // The client_secret returned by Paymob Create Intention API
        // Frontend passes this to Paymob JS SDK to open checkout
        public string ClientSecret { get; set; } = string.Empty;

        // Our Paymob public key (from appsettings Paymob:PublicKey)
        // Frontend also needs this for the Paymob JS SDK
        public string PublicKey { get; set; } = string.Empty;

        // Total amount in EGP - display to user on checkout page
        public decimal TotalAmount { get; set; }
    }
}
