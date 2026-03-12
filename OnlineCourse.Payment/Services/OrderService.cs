using Microsoft.EntityFrameworkCore;
using OnlineCourse.Payment.Data;
using OnlineCourse.Payment.DTOs;
using OnlineCourse.Payment.Entities;
using OnlineCourse.Payment.Entities.Enums;

namespace OnlineCourse.Payment.Services
{
    public class OrderService(ApplicationDbContext context, IPaymobService paymobService, IConfiguration config) : IOrderService
    {
        public async Task<PaymentIntentionResponseDto> CreateOrderAsync(CreateOrderDto dto, string userId)
        {
            // TODO:
            // 1. Call CourseManagement HTTP API to get name+price for each CourseId
            //    Use IHttpClientFactory with named client "CourseManagement"
            // 2. Build OrderItems from the fetched course data
            // 3. TotalAmount = sum of all prices
            // 4. Create and save Order entity
            // 5. Build CreateIntentionRequest and call paymobService.CreateIntentionAsync()
            // 6. Save PaymobIntentionId on the order
            // 7. Return PaymentIntentionResponseDto with ClientSecret + PublicKey
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<OrderResponseDto>> GetUserOrdersAsync(string userId)
        {
            // TODO:
            // 1. Query orders where UserId == userId, include OrderItems
            // 2. Map to OrderResponseDto manually
            throw new NotImplementedException();
        }

        public async Task<OrderResponseDto?> GetOrderByIdAsync(int orderId, string userId)
        {
            // TODO:
            // 1. Find order by id, include OrderItems + Transactions
            // 2. Return null if not found or order.UserId != userId
            // 3. Map to OrderResponseDto
            throw new NotImplementedException();
        }

        public async Task HandlePaymobCallbackAsync(PaymobCallbackDto callbackDto)
        {
            // TODO:
            // 1. Validate HMAC - throw UnauthorizedAccessException if invalid
            // 2. Find Order by int.Parse(callbackDto.Obj.MerchantOrderId)
            // 3. Create PaymentTransaction from callback data
            // 4. Update Order.Status = Paid or Failed
            // 5. await context.SaveChangesAsync()
            // 6. If Paid -> publish OrderPaidEvent to RabbitMQ
            //    { UserId, CourseIds } -> Enrollment service enrolls the user
            throw new NotImplementedException();
        }
    }
}
