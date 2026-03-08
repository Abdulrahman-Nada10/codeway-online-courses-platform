// ============================================================
// IPaymentTransactionRepository.cs - Transaction-specific contract
// ============================================================
// Inherits base CRUD from IGenericRepository<PaymentTransaction>
// Adds PaymentTransaction-specific queries

using OnlineCourse.Payment.Core.Entities;

namespace OnlineCourse.Payment.Core.Repository
{
    public interface IPaymentTransactionRepository : IGenericRepository<PaymentTransaction>
    {
        // Get all transactions for an order
        Task<IEnumerable<PaymentTransaction>> GetByOrderIdAsync(int orderId);

        // Find transaction by Paymob's ID - used to avoid duplicate callback processing
        Task<PaymentTransaction?> GetByPaymobTransactionIdAsync(long paymobId);
    }
}
