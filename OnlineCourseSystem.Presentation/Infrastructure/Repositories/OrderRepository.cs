using OnlineCourseSystem.Presentation.Domain.Entities;
using OnlineCourseSystem.Presentation.Domain.Repository;
using OnlineCourseSystem.Presentation.Infrastructure.Contexts;

namespace OnlineCourseSystem.Presentation.Infrastructure.Repositories
{
    public class OrderRepository(ApplicationDbContext context)
        : GenericRepository<Order, int>(context), IOrderRepository
    {
        // TODO: implement IOrderRepository-specific methods here
    }
}
