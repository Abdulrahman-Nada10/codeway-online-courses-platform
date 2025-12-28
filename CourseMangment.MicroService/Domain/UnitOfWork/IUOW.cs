using CourseMangment.MicroService.Domain.Entities;
using CourseMangment.MicroService.Domain.Repository;

namespace CourseMangment.MicroService.Domain.UnitOfWork
{
    public interface IUOW
    {
        IGenericRepo<TEntity, TKey> GetRepository<TEntity, TKey>() where TEntity : BaseEntity<TKey>;

        Task<int> SaveChangesAsync();
    }
}
