using CertificateGenerationMicroService.Domain.Entities;
using System.Linq.Expressions;

namespace CertificateGenerationMicroService.Domain.Repository
{
    public interface IGenericRepository<TEntity, TKey> where TEntity : BaseEntity<TKey>
    {
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(TKey id);
        Task CreateAsync(TEntity entity);
        void update(TEntity entity);
        void delete(TEntity entity);


        //  these overloads for eager loading
        Task<IEnumerable<TEntity>> GetAllAsync(params Expression<Func<TEntity, object>>[] includes);
        Task<TEntity?> GetByIdAsync(TKey id, params Expression<Func<TEntity, object>>[] includes);
    }
}
