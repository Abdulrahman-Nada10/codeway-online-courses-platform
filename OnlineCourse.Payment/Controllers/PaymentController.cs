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
    public class PaymentController(IOrderService orderService) : ControllerBase
    {
        // POST api/payment/create
        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized(ApiResponse<string>.UnauthorizedResponse());

            // Strip "Bearer " prefix - raw token forwarded to CourseManagement
            var authHeader = Request.Headers["Authorization"].ToString();
            var userToken = authHeader.StartsWith("Bearer ")
                ? authHeader["Bearer ".Length..]
                : authHeader;

            var result = await orderService.CreateOrderAsync(dto, userId, userToken);
            return Ok(ApiResponse<PaymentIntentionResponseDto>.SuccessResponse(
                result, "Payment intention created successfully"));
        }

        // GET api/payment/orders
        [Authorize]
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
        [Authorize]
        [HttpGet("orders/{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized(ApiResponse<string>.UnauthorizedResponse());

            var order = await orderService.GetOrderByIdAsync(id, userId);
            if (order == null)
                return NotFound(ApiResponse<string>.NotFoundResponse($"Order {id} not found"));

            return Ok(ApiResponse<OrderResponseDto>.SuccessResponse(order));
        }

        // POST api/payment/callback
        // AllowAnonymous - Paymob calls this directly, no JWT
        [AllowAnonymous]
        [HttpPost("callback")]
        public async Task<IActionResult> PaymobCallback([FromBody] PaymobCallbackDto dto)
        {
            // ALWAYS return 200 — Paymob retries endlessly on anything else
            try { await orderService.HandlePaymobCallbackAsync(dto); }
            catch { /* silent - never expose errors to Paymob */ }
            return Ok();
        }
    }
}
