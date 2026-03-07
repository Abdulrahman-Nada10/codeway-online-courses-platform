using OnlineCourse.Payment.Core.Entities;
using OnlineCourse.Payment.Core.Repository;

namespace OnlineCourse.Payment.Infrastracture.Persistence
{
    public class OrderRepository(ApplicationDbContext context)
        : GenericRepository<Order, int>(context), IOrderRepository
    {
        // TODO: implement IOrderRepository-specific methods here
    }
}
