using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.MicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.UnitOfWork
{
    public interface IUOW
    {
        IGenericRepository<TEntity, TKey> GetRepository<TEntity, TKey>() where TEntity : BaseEntity<TKey>;

        Task<int> SaveChangesAsync();
    }
}
