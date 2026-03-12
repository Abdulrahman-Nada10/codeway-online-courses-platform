using System.Security.Cryptography;
using System.Text;
using OnlineCourse.Payment.DTOs;

namespace OnlineCourse.Payment.Services
{
    public class PaymobService(IHttpClientFactory httpClientFactory, IConfiguration config) : IPaymobService
    {
        public async Task<string> CreateIntentionAsync(CreateIntentionRequest request)
        {
            // TODO:
            // 1. var client = httpClientFactory.CreateClient("Paymob")
            // 2. Add header: Authorization: Token {config["Paymob:SecretKey"]}
            // 3. POST to /v1/intention/ with request body
            // 4. Read response and return client_secret string
            throw new NotImplementedException();
        }

        public bool ValidateHmac(string callbackJson, string receivedHmac)
        {
            // TODO:
            // 1. Extract fields from callbackJson in exact Paymob-defined order
            // 2. Concatenate all values
            // 3. HMACSHA512(key: config["Paymob:HmacSecret"], data: concatenated)
            // 4. Compare hex result with receivedHmac
            throw new NotImplementedException();
        }
    }
}
