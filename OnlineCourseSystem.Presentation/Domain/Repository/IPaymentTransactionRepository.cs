using OnlineCourseSystem.Presentation.Domain.Entities;

namespace OnlineCourseSystem.Presentation.Domain.Repository
{
    public interface IPaymentTransactionRepository : IGenericRepository<PaymentTransaction, int>
    {
        // TODO: add PaymentTransaction-specific query methods here
        // e.g: Task<PaymentTransaction?> GetByPaymobTransactionIdAsync(long paymobTransactionId);
    }
}
