using GlobalResponse.Shared.Attributes;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace GlobalResponse.Shared
{
    public class RequestDuplicateProtectionMiddleware
    {
        private readonly RequestDelegate _next;
        private static readonly ConcurrentDictionary<string, DateTime> _requestTracker = new();
        private readonly DuplicateProtectionOptions _options;

        public RequestDuplicateProtectionMiddleware(RequestDelegate next, IOptions<DuplicateProtectionOptions> options)
        {
            _next = next;
            _options = options.Value;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Check if endpoint has the DisableDuplicateProtection attribute
            if (_options.ExcludedRoutes.Any(r => context.Request.Path.StartsWithSegments(r)))
            {
                await _next(context);
                return;
            }

            // اقرأ userID من الهيدر أو استخدم IP كبديل
            string userID = context.Request.Headers["userID"].ToString();
            if (string.IsNullOrWhiteSpace(userID))
            {
                userID = context.Connection.RemoteIpAddress?.ToString() ?? "unknown_ip";
            }

            var requestHash = await ComputeRequestHashAsync(context, userID);
            CleanExpiredRequests();

            if (_requestTracker.ContainsKey(requestHash))
            {
                context.Response.StatusCode = StatusCodes.Status409Conflict;
                context.Response.ContentType = "application/json";

                string lang = context.Request.Headers["languageCode"].ToString() ?? "en";

                string message = _options.Messages.ContainsKey(lang)
                    ? _options.Messages[lang]
                    : _options.Messages["en"];

                await context.Response.WriteAsync(JsonSerializer.Serialize(new
                {
                    success = false,
                    message
                }));

                return;
            }

            _requestTracker.TryAdd(requestHash, DateTime.UtcNow.AddSeconds(_options.TimeToLiveSeconds));
            await _next(context);
        }

        private static void CleanExpiredRequests()
        {
            var now = DateTime.UtcNow;
            foreach (var key in _requestTracker.Keys)
            {
                if (_requestTracker.TryGetValue(key, out var expiry) && expiry < now)
                    _requestTracker.TryRemove(key, out _);
            }
        }

        private static async Task<string> ComputeRequestHashAsync(HttpContext context, string identifier)
        {
            context.Request.EnableBuffering();

            string body = "";
            if (context.Request.ContentLength > 0)
            {
                using var reader = new StreamReader(context.Request.Body, Encoding.UTF8, leaveOpen: true);
                body = await reader.ReadToEndAsync();
                context.Request.Body.Position = 0;
            }

            var rawData = $"{identifier}:{context.Request.Method}:{context.Request.Path}:{body}";
            using var sha = SHA256.Create();
            var hashBytes = sha.ComputeHash(Encoding.UTF8.GetBytes(rawData));
            return Convert.ToHexString(hashBytes);
        }
    }

    public static class RequestDuplicateProtectionMiddlewareExtensions
    {
        public static IApplicationBuilder UseRequestDuplicateProtection(this IApplicationBuilder app)
        {
            return app.UseMiddleware<RequestDuplicateProtectionMiddleware>();
        }
    }
}
