using Microsoft.EntityFrameworkCore;
using OnlineCourse.Payment.Data;
using OnlineCourse.Payment.DTOs;
using OnlineCourse.Payment.Entities;
using OnlineCourse.Payment.Entities.Enums;
using System.Text.Json;

namespace OnlineCourse.Payment.Services
{
    public class OrderService(
        ApplicationDbContext context,
        IPaymobService paymobService,
        IConfiguration config,
        ICourseManagementService courseManagementService) : IOrderService
    {
        public async Task<PaymentIntentionResponseDto> CreateOrderAsync(
            CreateOrderDto dto, string userId, string userToken)
        {
            var orderItems = new List<OrderItem>();
            decimal totalAmount = 0;

            foreach (var courseId in dto.CourseIds)
            {
                var course = await courseManagementService.GetCourseByIdAsync(courseId, userToken);
                if (course == null)
                    throw new KeyNotFoundException($"Course {courseId} not found");

                var price = course.Price ?? 0;
                totalAmount += price;

                orderItems.Add(new OrderItem
                {
                    CourseId = courseId,
                    CourseName = course.Title,
                    Price = price
                });
            }

            var order = new Order
            {
                UserId = userId,
                TotalAmount = totalAmount,
                Status = OrderStatus.Pending,
                OrderItems = orderItems
            };
            context.Orders.Add(order);
            await context.SaveChangesAsync();

            var paymentMethodIds = config.GetSection("Paymob:PaymentMethodIds").Get<int[]>()
                ?? throw new InvalidOperationException("Paymob:PaymentMethodIds not configured");

            var intention = new CreateIntentionRequest
            {
                AmountCents = (long)(totalAmount * 100),
                Currency = "EGP",
                PaymentMethodIds = paymentMethodIds,
                MerchantOrderId = order.Id.ToString(),
                BillingData = new PaymobBillingData
                {
                    FirstName = dto.BillingData.FirstName,
                    LastName = dto.BillingData.LastName,
                    Email = dto.BillingData.Email,
                    PhoneNumber = dto.BillingData.Phone
                },
                Items = orderItems.Select(i => new PaymobItem
                {
                    Name = i.CourseName,
                    AmountCents = (long)(i.Price * 100),
                    Description = "Online Course",
                    Quantity = 1
                }).ToList()
            };

            var clientSecret = await paymobService.CreateIntentionAsync(intention);

            order.PaymobIntentionId = clientSecret;
            await context.SaveChangesAsync();

            var publicKey = config["Paymob:PublicKey"]!;

            return new PaymentIntentionResponseDto
            {
                OrderId = order.Id,
                ClientSecret = clientSecret,
                PublicKey = publicKey,
                TotalAmount = totalAmount,
                PaymentUrl = $"https://accept.paymob.com/unifiedcheckout/?publicKey={publicKey}&clientSecret={clientSecret}"
            };
        }

        public async Task<IEnumerable<OrderResponseDto>> GetUserOrdersAsync(string userId)
        {
            var orders = await context.Orders
                .Include(o => o.OrderItems)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            return orders.Select(MapToDto);
        }

        public async Task<OrderResponseDto?> GetOrderByIdAsync(int orderId, string userId)
        {
            var order = await context.Orders
                .Include(o => o.OrderItems)
                .Include(o => o.Transactions)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null || order.UserId != userId)
                return null;

            return MapToDto(order);
        }

        public async Task HandlePaymobCallbackAsync(string rawJson, string hmac)
        {
            var isValid = paymobService.ValidateHmac(rawJson, hmac);
            if (!isValid)
                throw new UnauthorizedAccessException("Invalid HMAC - not from Paymob");

            var callbackDto = JsonSerializer.Deserialize<PaymobCallbackDto>(
                rawJson,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            ) ?? throw new Exception("Failed to deserialize Paymob callback");

            var obj = callbackDto.Obj
                ?? throw new Exception("Paymob callback has no obj");

            var orderId = int.Parse(obj.MerchantOrderId
                ?? throw new Exception("MerchantOrderId missing from callback"));

            var order = await context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == orderId)
                ?? throw new KeyNotFoundException($"Order {orderId} not found");

            var transaction = new PaymentTransaction
            {
                OrderId = order.Id,
                PaymobTransactionId = obj.Id,
                Amount = obj.AmountCents / 100m,
                Status = obj.Success ? PaymentStatus.Success : PaymentStatus.Failed,
                PaymentMethod = obj.SourceData?.Type ?? "unknown",
                PaidAt = obj.Success ? DateTime.UtcNow : null,
                RawCallbackData = rawJson
            };
            context.PaymentTransactions.Add(transaction);

            order.Status = obj.Success
                ? OrderStatus.Paid
                : OrderStatus.Failed;

            await context.SaveChangesAsync();
        }

        private static OrderResponseDto MapToDto(Order order) => new()
        {
            Id = order.Id,
            TotalAmount = order.TotalAmount,
            Status = order.Status.ToString(),
            CreatedAt = order.CreatedAt,
            Items = order.OrderItems.Select(i => new OrderItemResponseDto
            {
                CourseId = i.CourseId,
                CourseName = i.CourseName,
                Price = i.Price
            }).ToList()
        };
    }
}
