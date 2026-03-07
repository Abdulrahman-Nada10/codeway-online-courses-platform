using OnlineCourse.Payment.Core.Entities;

namespace OnlineCourse.Payment.Core.Repository
{
    public interface IPaymentTransactionRepository : IGenericRepository<PaymentTransaction, int>
    {
        // TODO: add PaymentTransaction-specific query methods here
        // e.g: Task<PaymentTransaction?> GetByPaymobTransactionIdAsync(long paymobTransactionId);
    }
}
