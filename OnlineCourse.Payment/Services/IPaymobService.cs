namespace OnlineCourse.Payment.Services
{
    public interface IPaymobService
    {
        // POST https://accept.paymob.com/v1/intention/
        // Returns client_secret from Paymob response
        Task<string> CreateIntentionAsync(CreateIntentionRequest request);

        // Validates HMAC-SHA512 from Paymob callback
        // Returns true = genuine Paymob request
        bool ValidateHmac(string callbackJson, string receivedHmac);


        // PATCH https://accept.paymob.com/v1/intention/{clientSecret}/
        // Used to update amount/items/billing BEFORE the user pays
        // Returns updated client_secret
        Task<string> UpdateIntentionAsync(string clientSecret, CreateIntentionRequest request);
    }

    // Maps to Paymob's Create Intention request body
    public class CreateIntentionRequest
    {
        public long AmountCents { get; set; }
        public string Currency { get; set; } = "EGP";
        public List<PaymobItem> Items { get; set; } = [];
        public PaymobBillingData BillingData { get; set; } = null!;
        // Our Order.Id as string - Paymob sends this back in the webhook
        public string MerchantOrderId { get; set; } = string.Empty;
    }

    public class PaymobItem
    {
        public string Name { get; set; } = string.Empty;
        public long AmountCents { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; } = 1;
    }

    public class PaymobBillingData
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }
}
