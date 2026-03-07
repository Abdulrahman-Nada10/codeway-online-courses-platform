using OnlineCourse.Payment.Core.Entities;

namespace OnlineCourse.Payment.Core.Repository
{
    public interface IOrderRepository : IGenericRepository<Order, int>
    {
        // TODO: add Order-specific query methods here
        // e.g: Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);
    }
}
