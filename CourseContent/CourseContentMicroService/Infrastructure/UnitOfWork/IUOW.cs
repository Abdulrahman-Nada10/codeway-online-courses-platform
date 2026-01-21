using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Repository;

namespace CourseContentMicroService.Infrastructure.UnitOfWork
{
    public interface IUOW
    {
        IGenericRepository<TEntity, TKey> GetRepository<TEntity, TKey>() where TEntity : BaseEntity<TKey>;

        Task<int> SaveChangesAsync();
    }
}
