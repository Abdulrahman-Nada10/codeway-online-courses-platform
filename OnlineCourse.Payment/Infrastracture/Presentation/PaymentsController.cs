using Microsoft.AspNetCore.Mvc;
using OnlineCourse.Payment.Application.Interfaces;

namespace OnlineCourseSystem.Auth.Controllers
{
    [ApiController]
    [Route("api/payments")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentGateway _gateway;

        public PaymentsController(IPaymentGateway gateway)
        {
            _gateway = gateway;
        }

        [HttpPost("initiate")]
        public async Task<IActionResult> InitiatePayment(decimal amount, string currency)
        {
            var transactionId = await _gateway.InitiatePaymentAsync(amount, currency);
            return Ok(transactionId);
        }
    }

}
