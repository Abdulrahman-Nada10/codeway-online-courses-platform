using OnlineCourse.Payment.DTOs;

namespace OnlineCourse.Payment.Services
{
    public interface IOrderService
    {
        // Creates Order in DB then calls Paymob Create Intention API
        // Returns ClientSecret + PublicKey for frontend to open Paymob popup
        Task<PaymentIntentionResponseDto> CreateOrderAsync(CreateOrderDto dto, string userId);

        // Returns all orders for a user (order history)
        Task<IEnumerable<OrderResponseDto>> GetUserOrdersAsync(string userId);

        // Returns one order - verifies ownership (userId must match)
        Task<OrderResponseDto?> GetOrderByIdAsync(int orderId, string userId);

        // Called by Paymob webhook - validates HMAC then updates Order + creates Transaction
        Task HandlePaymobCallbackAsync(PaymobCallbackDto callbackDto);
    }
}
