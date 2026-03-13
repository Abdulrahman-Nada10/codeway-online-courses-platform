using Microsoft.EntityFrameworkCore;
using OnlineCourse.Payment.Data;
using OnlineCourse.Payment.DTOs;
using OnlineCourse.Payment.Entities;
using OnlineCourse.Payment.Entities.Enums;
using System.Text.Json;

namespace OnlineCourse.Payment.Services
{
    public class OrderService(ApplicationDbContext context, IPaymobService paymobService, IConfiguration config, ICourseManagementService courseManagementService) : IOrderService
    {
        public async Task<PaymentIntentionResponseDto> CreateOrderAsync(
                CreateOrderDto dto, string userId, string userToken)
        {
            // 1. Fetch course info from CourseManagement for each CourseId
            var orderItems = new List<OrderItem>();
            decimal totalAmount = 0;

            foreach (var courseId in dto.CourseIds)
            {
                // HTTP call to CourseManagement - forwards user JWT
                var course = await courseManagementService.GetCourseByIdAsync(courseId, userToken);
                if (course == null)
                    throw new KeyNotFoundException($"Course {courseId} not found");

                var price = course.Price ?? 0;  // null = free course
                totalAmount += price;

                orderItems.Add(new OrderItem
                {
                    CourseId = courseId,
                    CourseName = course.Title,  // snapshot - stored forever even if course name changes
                    Price = price
                });
            }

            // 2. Save Order to DB first - we need the Order.Id for Paymob merchant_order_id
            var order = new Order
            {
                UserId = userId,
                TotalAmount = totalAmount,
                Status = OrderStatus.Pending,
                OrderItems = orderItems
            };
            context.Orders.Add(order);
            await context.SaveChangesAsync();  // order.Id is now set by DB

            // 3. Call Paymob Create Intention API
            var intention = new CreateIntentionRequest
            {
                AmountCents = (long)(totalAmount * 100),  // 150.00 EGP → 15000
                Currency = "EGP",
                MerchantOrderId = order.Id.ToString(),    // Paymob sends this back in webhook
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

            // 4. Save PaymobIntentionId on the order for reference
            order.PaymobIntentionId = clientSecret;
            await context.SaveChangesAsync();

            // 5. Return to frontend - they use client_secret + public_key to open Paymob popup
            return new PaymentIntentionResponseDto
            {
                ClientSecret = clientSecret,
                PublicKey = config["Paymob:PublicKey"]!
            };
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
            // 1. Validate HMAC - if fake request, reject immediately


            // Serialize Obj back to JSON string for HMAC validation
            var rawJson = JsonSerializer.Serialize(new { obj = callbackDto.Obj });
            var isValid = paymobService.ValidateHmac(rawJson, callbackDto.Hmac!);

            if (!isValid)
                throw new UnauthorizedAccessException("Invalid HMAC - not from Paymob");

            // 2. Find the Order using merchant_order_id Paymob sent back
            var orderId = int.Parse(callbackDto.Obj.MerchantOrderId);
            var order = await context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == orderId)
                ?? throw new KeyNotFoundException($"Order {orderId} not found");

            // 3. Create PaymentTransaction record
            var transaction = new PaymentTransaction
            {
                OrderId = order.Id,
                PaymobTransactionId = callbackDto.Obj.Id,
                Amount = callbackDto.Obj.AmountCents,
                Status = callbackDto.Obj.Success ? PaymentStatus.Success:PaymentStatus.Failed ,
                PaymentMethod = callbackDto.Obj.SourceDataType ?? "unknown", // "card","wallet" ✅
                PaidAt = callbackDto.Obj.Success ? DateTime.UtcNow : null,
                RawCallbackData = rawJson  ,                           // store for audit/debug ✅

                CreatedAt = DateTime.UtcNow
            };
            context.PaymentTransactions.Add(transaction);

            // 4. Update Order status based on payment result
            order.Status = callbackDto.Obj.Success
                ? OrderStatus.Paid
                : OrderStatus.Failed;

            await context.SaveChangesAsync();

            // 5. If paid -> RabbitMQ event (team lead handles enrollment integration)
            // if (order.Status == OrderStatus.Paid)
            //     await messageBus.PublishAsync(new OrderPaidEvent { ... });
        }
    }
}
