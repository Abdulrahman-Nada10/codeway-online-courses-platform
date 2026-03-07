using Microsoft.EntityFrameworkCore;
using OnlineCourse.Payment.Core.Entities;
using OnlineCourse.Payment.Core.Repository;
using System.Linq.Expressions;

namespace OnlineCourse.Payment.Infrastracture.Persistence
{
    public class GenericRepository<TEntity, TKey>(ApplicationDbContext context)
        : IGenericRepository<TEntity, TKey> where TEntity : BaseEntity<TKey>
    {
        public async Task<IEnumerable<TEntity>> GetAllAsync()
            => await context.Set<TEntity>().ToListAsync();

        public async Task<IEnumerable<TEntity>> GetAllAsync(params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = context.Set<TEntity>();
            foreach (var include in includes)
                query = query.Include(include);
            return await query.ToListAsync();
        }

        public async Task<TEntity?> GetByIdAsync(TKey id)
            => await context.Set<TEntity>().FindAsync(id);

        public async Task<TEntity?> GetByIdAsync(TKey id, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = context.Set<TEntity>();
            foreach (var include in includes)
                query = query.Include(include);
            return await query.FirstOrDefaultAsync(e => e.Id!.Equals(id));
        }

        public async Task CreateAsync(TEntity entity)
            => await context.Set<TEntity>().AddAsync(entity);

        public void Update(TEntity entity)
            => context.Set<TEntity>().Update(entity);

        public void Delete(TEntity entity)
            => context.Set<TEntity>().Remove(entity);
    }
}
