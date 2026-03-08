// ============================================================
// IUOW.cs - Unit of Work contract
// ============================================================
// WHY THIS EXISTS:
//   Groups all repositories + SaveChangesAsync in one place.
//   OrderService injects IUOW - not individual repositories directly.
//   This ensures all DB changes in one request are saved atomically.

using OnlineCourse.Payment.Core.Repository;

namespace OnlineCourse.Payment.Core.UnitOfWork
{
    public interface IUOW : IDisposable
    {
        IOrderRepository Orders { get; }
        IPaymentTransactionRepository PaymentTransactions { get; }
        Task<int> SaveChangesAsync();
    }
}
