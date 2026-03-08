// ============================================================
// IOrderRepository.cs - Order-specific repository contract
// ============================================================
// Inherits base CRUD from IGenericRepository<Order>
// Adds Order-specific queries

using OnlineCourse.Payment.Core.Entities;

namespace OnlineCourse.Payment.Core.Repository
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        // Get all orders for a specific user (for order history)
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);

        // Get order with OrderItems + Transactions included (for details page)
        Task<Order?> GetByIdWithDetailsAsync(int orderId);
    }
}
