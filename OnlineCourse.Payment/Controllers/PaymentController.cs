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
        // [Authorize] - only logged in users
        // TODO: implement - call orderService.CreateOrderAsync(dto, userId)
        // Return 200 + PaymentIntentionResponseDto { clientSecret, publicKey, totalAmount }

        // GET api/payment/orders
        // [Authorize]
        // TODO: implement - call orderService.GetUserOrdersAsync(userId)

        // GET api/payment/orders/{id}
        // [Authorize]
        // TODO: implement - call orderService.GetOrderByIdAsync(id, userId)
        // Return 404 if null

        // POST api/payment/callback
        // [AllowAnonymous] - Paymob calls this, no JWT
        // TODO: implement - call orderService.HandlePaymobCallbackAsync(dto)
        // ALWAYS return 200 OK - Paymob retries if it gets anything else
    }
}
