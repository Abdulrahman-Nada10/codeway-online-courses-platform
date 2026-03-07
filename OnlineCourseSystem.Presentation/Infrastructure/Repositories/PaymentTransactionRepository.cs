using OnlineCourseSystem.Presentation.Domain.Entities;
using OnlineCourseSystem.Presentation.Domain.Repository;
using OnlineCourseSystem.Presentation.Infrastructure.Contexts;

namespace OnlineCourseSystem.Presentation.Infrastructure.Repositories
{
    public class PaymentTransactionRepository(ApplicationDbContext context)
        : GenericRepository<PaymentTransaction, int>(context), IPaymentTransactionRepository
    {
        // TODO: implement IPaymentTransactionRepository-specific methods here
    }
}
