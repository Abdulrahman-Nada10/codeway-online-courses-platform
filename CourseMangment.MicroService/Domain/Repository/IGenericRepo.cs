using CourseMangment.MicroService.Domain.Entities;
using System.Linq.Expressions;

namespace CourseMangment.MicroService.Domain.Repository
{
    public interface IGenericRepo<TEntity,TKey> where TEntity : BaseEntity<TKey>
    {
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(TKey id);
        Task CreateAsync(TEntity entity);
        void update(TEntity entity);
        void delete(TEntity entity);


        //  these overloads for eager loading
        Task<IEnumerable<TEntity>> GetAllAsync(params Expression<Func<TEntity, object>>[] includes);
        Task<TEntity?> GetByIdAsync(TKey id, params Expression<Func<TEntity, object>>[] includes);
        /////
        ///
        // الجديدة للـpagination / filtering
        IQueryable<TEntity> GetQueryable(params Expression<Func<TEntity, object>>[] includes);
    }
}
