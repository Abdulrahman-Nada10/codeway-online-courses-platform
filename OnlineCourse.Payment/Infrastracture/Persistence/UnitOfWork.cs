using OnlineCourse.Payment.Core.Entities;
using OnlineCourse.Payment.Core.Repository;
using OnlineCourse.Payment.Core.UnitOfWork;

namespace OnlineCourse.Payment.Infrastracture.Persistence
{
    public class UnitOfWork(
        ApplicationDbContext context,
        IOrderRepository orders,
        IPaymentTransactionRepository paymentTransactions) : IUOW
    {
        private readonly Dictionary<string, object> _repositories = [];

        public IOrderRepository Orders { get; } = orders;
        public IPaymentTransactionRepository PaymentTransactions { get; } = paymentTransactions;

        public IGenericRepository<TEntity, TKey> GetRepository<TEntity, TKey>() where TEntity : BaseEntity<TKey>
        {
            var typeName = typeof(TEntity).Name;

            if (_repositories.ContainsKey(typeName))
                return (IGenericRepository<TEntity, TKey>)_repositories[typeName];

            var repo = new GenericRepository<TEntity, TKey>(context);
            _repositories.Add(typeName, repo);
            return repo;
        }

        public async Task<int> SaveChangesAsync()
            => await context.SaveChangesAsync();
    }
}
