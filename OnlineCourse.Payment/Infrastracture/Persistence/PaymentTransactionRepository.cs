using OnlineCourse.Payment.Core.Entities;
using OnlineCourse.Payment.Core.Repository;

namespace OnlineCourse.Payment.Infrastracture.Persistence
{
    public class PaymentTransactionRepository(ApplicationDbContext context)
        : GenericRepository<PaymentTransaction, int>(context), IPaymentTransactionRepository
    {
        // TODO: implement IPaymentTransactionRepository-specific methods here
    }
}
