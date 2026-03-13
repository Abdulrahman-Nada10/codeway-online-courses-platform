using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace OnlineCourse.Payment.Services
{
    public class PaymobService(IHttpClientFactory httpClientFactory, IConfiguration config) : IPaymobService
    {
        public async Task<string> CreateIntentionAsync(CreateIntentionRequest request)
        {
            var client = httpClientFactory.CreateClient("Paymob");

            // Paymob uses "Token" keyword, NOT "Bearer"
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Token", config["Paymob:SecretKey"]);

            var body = new
            {
                amount = request.AmountCents,           // must be in cents e.g. 15000 = 150 EGP
                currency = request.Currency,            // "EGP"
                payment_methods = request.PaymentMethodIds, // integer IDs from Paymob dashboard
                items = request.Items.Select(i => new
                {
                    name = i.Name,
                    amount = i.AmountCents,
                    description = i.Description,
                    quantity = i.Quantity
                }),
                billing_data = new
                {
                    first_name = request.BillingData.FirstName,
                    last_name = request.BillingData.LastName,
                    email = request.BillingData.Email,
                    phone_number = request.BillingData.PhoneNumber
                },
                merchant_order_id = request.MerchantOrderId // our DB Order.Id
            };

            var response = await client.PostAsJsonAsync("/v1/intention/", body);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"Paymob CreateIntention failed: {error}");
            }

            // Paymob response shape: { "client_secret": "...", ... }
            var json = await response.Content.ReadFromJsonAsync<JsonElement>();
            return json.GetProperty("client_secret").GetString()
                   ?? throw new Exception("Paymob returned no client_secret");
        }

        public bool ValidateHmac(string rawCallbackJson, string receivedHmac)
        {
            // Parse the RAW original JSON from Paymob
            // Fields must be in EXACT order Paymob defines - changing order = wrong hash
            var json = JsonDocument.Parse(rawCallbackJson).RootElement;

            // Paymob wraps the transaction object under "obj"
            var obj = json.GetProperty("obj");

            var fields = new[]
            {
                obj.GetProperty("amount_cents").ToString(),
                obj.GetProperty("created_at").ToString(),
                obj.GetProperty("currency").ToString(),
                obj.GetProperty("error_occured").ToString().ToLower(),
                obj.GetProperty("has_parent_transaction").ToString().ToLower(),
                obj.GetProperty("id").ToString(),
                obj.GetProperty("integration_id").ToString(),
                obj.GetProperty("is_3d_secure").ToString().ToLower(),
                obj.GetProperty("is_auth").ToString().ToLower(),
                obj.GetProperty("is_capture").ToString().ToLower(),
                obj.GetProperty("is_refunded").ToString().ToLower(),
                obj.GetProperty("is_standalone_payment").ToString().ToLower(),
                obj.GetProperty("is_voided").ToString().ToLower(),
                obj.GetProperty("order").GetProperty("id").ToString(),
                obj.GetProperty("owner").ToString(),
                obj.GetProperty("pending").ToString().ToLower(),
                obj.GetProperty("source_data").GetProperty("pan").ToString(),
                obj.GetProperty("source_data").GetProperty("sub_type").ToString(),
                obj.GetProperty("source_data").GetProperty("type").ToString(),
                obj.GetProperty("success").ToString().ToLower()
            };

            var concatenated = string.Concat(fields);

            var keyBytes = Encoding.UTF8.GetBytes(config["Paymob:HmacSecret"]!);
            var dataBytes = Encoding.UTF8.GetBytes(concatenated);
            var hash = HMACSHA512.HashData(keyBytes, dataBytes);
            var computedHmac = Convert.ToHexString(hash).ToLower();

            return computedHmac == receivedHmac.ToLower();
        }
    }
}
