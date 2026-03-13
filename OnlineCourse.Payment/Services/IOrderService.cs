using OnlineCourse.Payment.DTOs;

namespace OnlineCourse.Payment.Services
{
    public interface IOrderService
    {
        Task<PaymentIntentionResponseDto> CreateOrderAsync(CreateOrderDto dto, string userId, string userToken);
        Task<IEnumerable<OrderResponseDto>> GetUserOrdersAsync(string userId);
        Task<OrderResponseDto?> GetOrderByIdAsync(int orderId, string userId);
        // rawJson = original Paymob body, hmac = from query string ?hmac=
        Task HandlePaymobCallbackAsync(string rawJson, string hmac);
    }
}
