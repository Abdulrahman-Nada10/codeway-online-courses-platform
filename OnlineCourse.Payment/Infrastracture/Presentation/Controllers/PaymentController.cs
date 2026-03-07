// ============================================================
// PaymentController.cs - Payment API endpoints
// ============================================================
// WHY THIS EXISTS:
//   Thin controller - only receives HTTP requests and returns responses.
//   Zero business logic here. Everything delegated to IOrderService.
//
// INJECT: IOrderService only
// BASE ROUTE: api/payment

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineCourse.Payment.Application.DTOs.Requests;
using OnlineCourse.Payment.Application.Interfaces;

namespace OnlineCourse.Payment.Infrastracture.Presentation.Controllers
{
    [ApiController]
    [Route("api/payment")]
    public class PaymentController : ControllerBase
    {
        // TODO: inject IOrderService in constructor

        // POST api/payment/create
        // [Authorize] - only logged-in users can buy
        // 1. Read userId from JWT: User.FindFirst(ClaimTypes.NameIdentifier)?.Value
        // 2. Call _orderService.CreateOrderAsync(dto, userId)
        // 3. Return 200 OK + PaymentIntentionResponseDto
        //    Frontend uses { clientSecret, publicKey } to open Paymob checkout popup

        // GET api/payment/orders
        // [Authorize] - user sees only their own orders
        // 1. Read userId from JWT claims
        // 2. Call _orderService.GetUserOrdersAsync(userId)
        // 3. Return 200 OK + List<OrderResponseDto>

        // GET api/payment/orders/{id}
        // [Authorize]
        // 1. Read userId from JWT claims
        // 2. Call _orderService.GetOrderByIdAsync(id, userId)
        // 3. Return 200 OK + OrderResponseDto OR 404 NotFound

        // POST api/payment/callback
        // [AllowAnonymous] - Paymob calls this server-to-server (no user JWT)
        // This is the WEBHOOK endpoint Paymob hits after payment completes
        // SET THIS URL in Paymob Dashboard:
        //   accept.paymob.com -> Developers -> Payment Integrations -> Edit
        //   -> Transaction Processed Callback = https://yourdomain/api/payment/callback
        // 1. Serialize request body to string for HMAC validation
        // 2. Call _orderService.HandlePaymobCallbackAsync(dto)
        // 3. ALWAYS return 200 OK (even on errors - just log)
        //    Paymob RETRIES if it doesn't receive 200
    }
}
