using CourseMangment.MicroService.Domain.Entities;

namespace CourseMangment.MicroService.Domain.Repository
{
    public interface IGenericRepo<TEntity,TKey> where TEntity : BaseEntity<TKey>
    {
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(TKey id);
        Task CreateAsync(TEntity entity);
        void update(TEntity entity);
        void delete(TEntity entity);
    }
}
