// ============================================================
// OrderRepository.cs - Implements IOrderRepository
// ============================================================
// WHY THIS EXISTS:
//   Adds Order-specific queries on top of GenericRepository.
//   Generic CRUD is inherited - only custom queries go here.
//
// TODO: Implement Order-specific methods:
//   - GetOrdersByUserIdAsync(userId)
//       -> _context.Orders
//              .Include(o => o.OrderItems)
//              .Where(o => o.UserId == userId)
//              .ToListAsync()
//
//   - GetByIdWithDetailsAsync(orderId)
//       -> _context.Orders
//              .Include(o => o.OrderItems)
//              .Include(o => o.Transactions)
//              .FirstOrDefaultAsync(o => o.Id == orderId)

using OnlineCourse.Payment.Core.Entities;
using OnlineCourse.Payment.Core.Repository;

namespace OnlineCourse.Payment.Infrastracture.Persistence
{
    public class OrderRepository(ApplicationDbContext context)
        : GenericRepository<Order>(context), IOrderRepository
    {
        // TODO: implement GetOrdersByUserIdAsync
        public Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId)
            => throw new NotImplementedException();

        // TODO: implement GetByIdWithDetailsAsync
        public Task<Order?> GetByIdWithDetailsAsync(int orderId)
            => throw new NotImplementedException();
    }
}
