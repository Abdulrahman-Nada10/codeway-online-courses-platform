using GlobalResponse.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineCourse.Payment.DTOs;
using OnlineCourse.Payment.Services;
using System.Security.Claims;

namespace OnlineCourse.Payment.Controllers
{
    [ApiController]
    [Route("api/payment")]
    public class PaymentController(IOrderService orderService, ILogger<PaymentController> logger) : ControllerBase
    {
        // POST api/payment/create
        //[Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
        {
            //var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //if (userId == null)
            //    return Unauthorized(ApiResponse<string>.UnauthorizedResponse());
            var userId = "test-user-123";

            // Strip "Bearer " prefix - raw token forwarded to CourseManagement
            var authHeader = Request.Headers["Authorization"].ToString();
            var userToken = authHeader.StartsWith("Bearer ")
        ? authHeader["Bearer ".Length..]
        : "test-token";

            var result = await orderService.CreateOrderAsync(dto, userId, userToken);
            return Ok(ApiResponse<PaymentIntentionResponseDto>.SuccessResponse(
                result, "Payment intention created successfully"));
        }

        // GET api/payment/orders
        //[Authorize]
        [HttpGet("orders")]
        public async Task<IActionResult> GetUserOrders()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized(ApiResponse<string>.UnauthorizedResponse());

            var orders = await orderService.GetUserOrdersAsync(userId);
            return Ok(ApiResponse<IEnumerable<OrderResponseDto>>.SuccessResponse(orders));
        }

        // GET api/payment/orders/{id}
        //[Authorize]
        [HttpGet("orders/{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            //var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //if (userId == null)
            //    return Unauthorized(ApiResponse<string>.UnauthorizedResponse());
            var userId = "test-user-123";

            var order = await orderService.GetOrderByIdAsync(id, userId);
            if (order == null)
                return NotFound(ApiResponse<string>.NotFoundResponse($"Order {id} not found"));

            return Ok(ApiResponse<OrderResponseDto>.SuccessResponse(order));
        }

        // POST api/payment/callback?hmac=xxx
        // AllowAnonymous - Paymob calls this directly, no JWT
        // Paymob sends HMAC as query param, NOT in the JSON body
        [AllowAnonymous]
        [HttpPost("callback")]
        public async Task<IActionResult> PaymobCallback([FromQuery] string hmac)
        {
            // Read raw body - MUST validate HMAC on the original JSON, not re-serialized DTO
            using var reader = new StreamReader(Request.Body);
            var rawBody = await reader.ReadToEndAsync();

            // ALWAYS return 200 — Paymob retries endlessly on anything else
            try
            {
                await orderService.HandlePaymobCallbackAsync(rawBody, hmac);
            }
            catch (Exception ex)
            {
                // Log but never expose to Paymob — still return 200
                logger.LogError(ex, "Paymob callback processing failed. Body: {Body}", rawBody);
            }
            return Ok();
        }
    }
}
