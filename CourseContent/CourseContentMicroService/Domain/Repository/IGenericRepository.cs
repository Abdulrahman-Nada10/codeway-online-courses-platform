using CourseContentMicroService.Domain.Entities;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using System.Linq.Expressions;

namespace CourseContentMicroService.Domain.Repository
{
    public interface IGenericRepository<TEntity, Tkey> where TEntity : BaseEntity<Tkey>
    {
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(Tkey id);
        Task CreateAsync(TEntity entity);
        void update(TEntity entity);
        void delete(TEntity entity);


        //  these overloads for eager loading
        Task<IEnumerable<TEntity>> GetAllAsync(params Expression<Func<TEntity, object>>[] includes);
        Task<TEntity?> GetByIdAsync(Tkey id, params Expression<Func<TEntity, object>>[] includes);
    }
}
