using OnlineCourse.Payment.Core.Entities;
using OnlineCourse.Payment.Core.Repository;

namespace OnlineCourse.Payment.Core.UnitOfWork
{
    public interface IUOW
    {
        // Generic repo accessor - same pattern as CourseContent
        IGenericRepository<TEntity, TKey> GetRepository<TEntity, TKey>() where TEntity : BaseEntity<TKey>;

        // Specific repos exposed directly
        IOrderRepository Orders { get; }
        IPaymentTransactionRepository PaymentTransactions { get; }

        Task<int> SaveChangesAsync();
    }
}
