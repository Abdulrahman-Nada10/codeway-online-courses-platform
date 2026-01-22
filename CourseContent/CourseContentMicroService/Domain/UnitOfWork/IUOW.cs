using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Repository;

namespace CourseContentMicroService.Domain.UnitOfWork
{
    public interface IUOW
    {
        IGenericRepository<TEntity, TKey> GetRepository<TEntity, TKey>() where TEntity : BaseEntity<TKey>;

        Task<int> SaveChangesAsync();
    }
}
