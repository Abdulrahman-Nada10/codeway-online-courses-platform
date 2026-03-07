using OnlineCourseSystem.Presentation.Domain.Entities;

namespace OnlineCourseSystem.Presentation.Domain.Repository
{
    public interface IOrderRepository : IGenericRepository<Order, int>
    {
        // TODO: add Order-specific query methods here
        // e.g: Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);
    }
}
