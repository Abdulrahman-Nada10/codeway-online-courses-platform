// ============================================================
// IOrderService.cs - Contract for all Order business logic
// ============================================================
// WHY THIS EXISTS (Dependency Inversion):
//   The Controller depends on this INTERFACE, not the concrete class.
//   This lets you: swap implementations and mock in tests easily.
//
// WHO IMPLEMENTS THIS: Application/Services/OrderService.cs

using OnlineCourse.Payment.Application.DTOs.Requests;
using OnlineCourse.Payment.Application.DTOs.Responses;

namespace OnlineCourse.Payment.Application.Interfaces
{
    public interface IOrderService
    {
        // STEP 1 of payment flow - called when user clicks "Buy Now"
        // a) Fetch course names+prices from CourseManagement service
        // b) Create Order + OrderItems in DB
        // c) Call IPaymobService.CreateIntentionAsync() → get client_secret
        // d) Return PaymentIntentionResponseDto to frontend
        Task<PaymentIntentionResponseDto> CreateOrderAsync(CreateOrderDto dto, string userId);

        // Returns all orders for a user (for order history page)
        Task<IEnumerable<OrderResponseDto>> GetUserOrdersAsync(string userId);

        // Returns one order (must verify order.UserId == userId for security)
        Task<OrderResponseDto?> GetOrderByIdAsync(int orderId, string userId);

        // STEP 3 of payment flow - called when Paymob POSTs to our webhook
        // a) Validate HMAC
        // b) Find Order by MerchantOrderId
        // c) Create PaymentTransaction
        // d) Update Order.Status = Paid or Failed
        // e) If success → publish event to message bus for Enrollment service
        Task HandlePaymobCallbackAsync(PaymobCallbackDto callbackDto);
    }
}
