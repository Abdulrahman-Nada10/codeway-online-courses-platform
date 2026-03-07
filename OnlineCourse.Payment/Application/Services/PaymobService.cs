// ============================================================
// PaymobService.cs - Implements IPaymobService
// ============================================================
// All Paymob HTTP API calls live here.
// Uses IHttpClientFactory (registered as "Paymob" named client in Program.cs).
//
// INJECT VIA CONSTRUCTOR:
//   - IHttpClientFactory  -> named client "Paymob"
//   - IConfiguration      -> Paymob:SecretKey, Paymob:HmacSecret
//   - ILogger<PaymobService>

using OnlineCourse.Payment.Application.Interfaces;

namespace OnlineCourse.Payment.Application.Services
{
    public class PaymobService : IPaymobService
    {
        // TODO: inject IHttpClientFactory, IConfiguration, ILogger in constructor

        public async Task<string> CreateIntentionAsync(CreateIntentionRequest request)
        {
            // TODO:
            // 1. var client = _httpClientFactory.CreateClient("Paymob")
            // 2. client.DefaultRequestHeaders.Authorization =
            //       new AuthenticationHeaderValue("Token", _config["Paymob:SecretKey"])
            // 3. Build request body:
            //    {
            //      "amount": request.AmountCents,
            //      "currency": "EGP",
            //      "payment_methods": [IntegrationId],
            //      "items": [ { "name": ..., "amount": ..., "quantity": 1, "description": ... } ],
            //      "billing_data": { "first_name": ..., "last_name": ..., "email": ..., "phone_number": ... },
            //      "extras": { "merchant_order_id": request.MerchantOrderId }
            //    }
            // 4. var response = await client.PostAsJsonAsync("/v1/intention/", body)
            // 5. response.EnsureSuccessStatusCode()
            // 6. var result = await response.Content.ReadFromJsonAsync<PaymobIntentionResult>()
            // 7. return result.ClientSecret
            //
            // Local record: record PaymobIntentionResult(string ClientSecret, string Id);
            throw new NotImplementedException();
        }

        public bool ValidateHmac(string callbackJson, string receivedHmac)
        {
            // TODO: Paymob HMAC-SHA512 validation
            //
            // 1. hmacSecret = _config["Paymob:HmacSecret"]
            // 2. Parse callbackJson and extract these fields IN THIS EXACT ORDER
            //    (order matters - defined by Paymob docs):
            //    amount_cents, created_at, currency, error_occured,
            //    has_parent_transaction, id, integration_id, is_3d_secure,
            //    is_auth, is_capture, is_refunded, is_standalone_payment,
            //    is_voided, order.id, owner, pending, source_data.pan,
            //    source_data.sub_type, source_data.type, success
            // 3. Concatenate all values as strings (no separator)
            // 4. var keyBytes = Encoding.UTF8.GetBytes(hmacSecret)
            //    var dataBytes = Encoding.UTF8.GetBytes(concatenatedString)
            //    using var hmac = new HMACSHA512(keyBytes)
            //    var computedBytes = hmac.ComputeHash(dataBytes)
            //    var computedHmac = Convert.ToHexString(computedBytes).ToLower()
            // 5. return computedHmac == receivedHmac.ToLower()
            throw new NotImplementedException();
        }
    }
}
