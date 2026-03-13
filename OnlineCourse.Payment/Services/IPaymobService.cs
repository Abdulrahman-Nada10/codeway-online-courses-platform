using OnlineCourse.Payment.DTOs;

namespace OnlineCourse.Payment.Services
{
    public interface IPaymobService
    {
        Task<string> CreateIntentionAsync(CreateIntentionRequest request);
        // rawCallbackJson = original body string from Paymob (never re-serialized)
        // receivedHmac    = value from ?hmac= query param
        bool ValidateHmac(string rawCallbackJson, string receivedHmac);
    }

    public class CreateIntentionRequest
    {
        public long AmountCents { get; set; }
        public string Currency { get; set; } = "EGP";
        // Integer integration IDs from Paymob dashboard (NOT string names like "card")
        public int[] PaymentMethodIds { get; set; } = [];
        public string? MerchantOrderId { get; set; }
        public PaymobBillingData BillingData { get; set; } = new();
        public List<PaymobItem> Items { get; set; } = [];
    }

    public class PaymobBillingData
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }

    public class PaymobItem
    {
        public string Name { get; set; } = string.Empty;
        public long AmountCents { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; } = 1;
    }
}
