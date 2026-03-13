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
            // TODO:
            // 1. var client = httpClientFactory.CreateClient("Paymob")
            // 2. Add header: Authorization: Token {config["Paymob:SecretKey"]}

            var client = httpClientFactory.CreateClient("Paymob");

            // Source: Paymob docs - Authorization header must be "Token {secret_key}"
            // NOT "Bearer" — Paymob uses "Token" keyword specifically
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Token", config["Paymob:SecretKey"]);
            // 3. POST to /v1/intention/ with request body
            var body = new
            {
                amount = request.AmountCents,           // must be in cents e.g. 15000 = 150 EGP
                currency = request.Currency,            // "EGP"
                payment_methods = new[] { "card" },     // card payments only for now
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
                merchant_order_id = request.MerchantOrderId // your DB Order.Id
            };

            // 4. Read response and return client_secret string



            var response = await client.PostAsJsonAsync("/v1/intention/", body);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"Paymob CreateIntention failed: {error}");
            }
            // Paymob response shape: { "client_secret": "...", ... }
            // Source: Paymob docs response body
            var json = await response.Content.ReadFromJsonAsync<JsonElement>();
            return json.GetProperty("client_secret").GetString()
                   ?? throw new Exception("Paymob returned no client_secret");
        }

        public bool ValidateHmac(string callbackJson, string receivedHmac)
        {
            // TODO:
            // 1. Extract fields from callbackJson in exact Paymob-defined order
            // 2. Concatenate all values
            // 3. HMACSHA512(key: config["Paymob:HmacSecret"], data: concatenated)
            // 4. Compare hex result with receivedHmac
            // Parse the full callback JSON


            var json = JsonDocument.Parse(callbackJson).RootElement;
            var obj = json.GetProperty("obj");

            // Fields in EXACT order Paymob defines - changing order = wrong hash
            // Source: https://developers.paymob.com/egypt/payment-feedback/transaction-webhook
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

            // HMAC-SHA512 with your HmacSecret from appsettings
            var keyBytes = Encoding.UTF8.GetBytes(config["Paymob:HmacSecret"]!);
            var dataBytes = Encoding.UTF8.GetBytes(concatenated);
            var hash = HMACSHA512.HashData(keyBytes, dataBytes);
            var computedHmac = Convert.ToHexString(hash).ToLower();

            return computedHmac == receivedHmac.ToLower();
        }
        public async Task<string> UpdateIntentionAsync(string clientSecret, CreateIntentionRequest request)
        {
            var client = httpClientFactory.CreateClient("Paymob");
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Token", config["Paymob:SecretKey"]);

            // Same body shape as CreateIntention
            var body = new
            {
                amount = request.AmountCents,
                currency = request.Currency,
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
                }
            };

            // PATCH not POST — updates the existing intention by client_secret
            var response = await client.PatchAsJsonAsync($"/v1/intention/{clientSecret}/", body);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"Paymob UpdateIntention failed: {error}");
            }

            var json = await response.Content.ReadFromJsonAsync<JsonElement>();
            return json.GetProperty("client_secret").GetString()
                   ?? throw new Exception("Paymob returned no client_secret");
        }

    }
}
