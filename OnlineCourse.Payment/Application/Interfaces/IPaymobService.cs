// ============================================================
// IPaymobService.cs - Contract for all Paymob HTTP API calls
// ============================================================
// WHY SEPARATED FROM IOrderService:
//   Paymob API calls are external HTTP calls with their own concerns.
//   Separating makes it easy to mock Paymob in unit tests
//   and swap payment providers in the future.
//
// WHO IMPLEMENTS THIS: Application/Services/PaymobService.cs

using OnlineCourse.Payment.Application.DTOs.Requests;

namespace OnlineCourse.Payment.Application.Interfaces
{
    public interface IPaymobService
    {
        // Calls POST https://accept.paymob.com/v1/intention/
        // Headers: Authorization: Token {SecretKey}
        // Returns the client_secret string from Paymob response
        Task<string> CreateIntentionAsync(CreateIntentionRequest request);

        // Validates the HMAC from Paymob webhook callback
        // Uses HMAC-SHA512 with HmacSecret from appsettings
        // Returns true = genuine Paymob request
        // NEVER skip this before processing a callback
        bool ValidateHmac(string callbackJson, string receivedHmac);
    }

    // Internal model - maps to the JSON body for Paymob Create Intention API
    public class CreateIntentionRequest
    {
        // Amount in CENTS (price * 100). Example: 500 EGP = 50000 cents
        public long AmountCents { get; set; }

        // Always "EGP" for Egypt
        public string Currency { get; set; } = "EGP";

        // The courses being purchased
        public List<PaymobItem> Items { get; set; } = [];

        // User billing info required by Paymob
        public PaymobBillingData BillingData { get; set; } = null!;

        // Our Order.Id as string
        // Paymob sends this back in the callback so we can find the Order in our DB
        public string MerchantOrderId { get; set; } = string.Empty;
    }

    // Maps to Paymob's "items" array in the intention request
    public class PaymobItem
    {
        public string Name { get; set; } = string.Empty;
        public long AmountCents { get; set; }              // Course price in cents
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; } = 1;             // Always 1 per course
    }

    // Maps to Paymob's "billing_data" object in the intention request
    public class PaymobBillingData
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        // Tip: use "NA" for optional fields you don't have (apartment, floor, etc.)
    }
}
