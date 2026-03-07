// ============================================================
// OrderService.cs - Implements IOrderService
// ============================================================
// All Order business logic lives here.
// Controller calls this. This calls UoW + PaymobService.
//
// INJECT VIA CONSTRUCTOR:
//   - IUOW              → database operations
//   - IPaymobService    → Paymob HTTP calls
//   - IMapper           → Entity ↔ DTO mapping
//   - IConfiguration    → read PublicKey from appsettings
//   - IHttpClientFactory (or a dedicated CourseService) → call CourseManagement API
//   - ILogger<OrderService>

using OnlineCourse.Payment.Application.DTOs.Requests;
using OnlineCourse.Payment.Application.DTOs.Responses;
using OnlineCourse.Payment.Application.Interfaces;

namespace OnlineCourse.Payment.Application.Services
{
    public class OrderService : IOrderService
    {
        // TODO: inject dependencies in constructor

        public Task<PaymentIntentionResponseDto> CreateOrderAsync(CreateOrderDto dto, string userId)
        {
            // TODO:
            // 1. For each CourseId in dto.CourseIds:
            //      - Call CourseManagement HTTP API to get course name + price
            //      - Build OrderItem entity for each course
            // 2. TotalAmount = sum of all course prices
            // 3. Create Order: { UserId, TotalAmount, Status = Pending }
            // 4. Add OrderItems to Order.OrderItems
            // 5. await _uow.Orders.CreateAsync(order)
            // 6. await _uow.SaveChangesAsync()  <- get Order.Id here
            // 7. Build CreateIntentionRequest:
            //      AmountCents = TotalAmount * 100
            //      Items = from OrderItems
            //      BillingData = from dto.BillingData
            //      MerchantOrderId = order.Id.ToString()
            // 8. clientSecret = await _paymobService.CreateIntentionAsync(request)
            // 9. order.PaymobIntentionId = intentionId (from Paymob response)
            //    await _uow.SaveChangesAsync()
            // 10. Return PaymentIntentionResponseDto:
            //         OrderId = order.Id
            //         ClientSecret = clientSecret
            //         PublicKey = _config["Paymob:PublicKey"]
            //         TotalAmount = order.TotalAmount
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OrderResponseDto>> GetUserOrdersAsync(string userId)
        {
            // TODO:
            // 1. orders = await _uow.Orders.GetOrdersByUserIdAsync(userId)
            // 2. return _mapper.Map<IEnumerable<OrderResponseDto>>(orders)
            throw new NotImplementedException();
        }

        public Task<OrderResponseDto?> GetOrderByIdAsync(int orderId, string userId)
        {
            // TODO:
            // 1. order = await _uow.Orders.GetByIdAsync(orderId, o => o.OrderItems, o => o.Transactions)
            // 2. if order == null || order.UserId != userId -> return null
            //    SECURITY: users must only see their own orders
            // 3. return _mapper.Map<OrderResponseDto>(order)
            throw new NotImplementedException();
        }

        public Task HandlePaymobCallbackAsync(PaymobCallbackDto callbackDto)
        {
            // TODO:
            // 1. Serialize callbackDto to JSON
            // 2. VALIDATE HMAC:
            //    if (!_paymobService.ValidateHmac(json, callbackDto.Hmac))
            //        throw new UnauthorizedAccessException("Invalid HMAC");
            // 3. Parse orderId = int.Parse(callbackDto.Obj.MerchantOrderId)
            // 4. order = await _uow.Orders.GetByIdAsync(orderId)
            // 5. Create PaymentTransaction:
            //      PaymobTransactionId = callbackDto.Obj.Id
            //      Amount = callbackDto.Obj.AmountCents / 100m
            //      PaymentMethod = callbackDto.Obj.SourceDataType
            //      RawCallbackData = serialize full callbackDto to JSON
            // 6. if callbackDto.Obj.Success == true:
            //        transaction.Status = Success, transaction.PaidAt = UtcNow
            //        order.Status = Paid
            //    else:
            //        transaction.Status = Failed
            //        order.Status = Failed
            // 7. await _uow.PaymentTransactions.CreateAsync(transaction)
            //    _uow.Orders.Update(order)
            //    await _uow.SaveChangesAsync()
            // 8. If Paid -> publish OrderPaidEvent to RabbitMQ:
            //    { UserId = order.UserId, CourseIds = order.OrderItems.Select(x => x.CourseId) }
            //    Enrollment service listens and enrolls user in the courses
            throw new NotImplementedException();
        }
    }
}
