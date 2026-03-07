using OnlineCourseSystem.Presentation.Domain.Entities;
using OnlineCourseSystem.Presentation.Domain.Repository;

namespace OnlineCourseSystem.Presentation.Domain.UnitOfWork
{
    public interface IUOW
    {
        // Generic accessor - same pattern as CourseContent & CourseMangment services
        IGenericRepository<TEntity, TKey> GetRepository<TEntity, TKey>() where TEntity : BaseEntity<TKey>;

        // Specific repos exposed directly on UoW
        IOrderRepository Orders { get; }
        IPaymentTransactionRepository PaymentTransactions { get; }

        Task<int> SaveChangesAsync();
    }
}
