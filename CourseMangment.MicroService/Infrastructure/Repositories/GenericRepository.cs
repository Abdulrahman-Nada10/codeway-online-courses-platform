using CourseMangment.MicroService.Domain.Entities;
using CourseMangment.MicroService.Domain.Repository;
using CourseMangment.MicroService.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace CourseMangment.MicroService.Infrastructure.Repositories
{
    public class GenericRepository<TEntity, TKey>(ApplicationDbContext context) : IGenericRepo<TEntity, TKey> where TEntity : BaseEntity<TKey>
    {

        //a3ml mkhzn ystlem mny el expresions 3shan a3ml dynamic queries ==> From service to Repo layer => then use it to create the dynamic Queries


        //all are static queries so we need to make it more dynamic queries to make it more reusable and Be more With the O in SOLID principles
        //so we gonna use specification pattern to make it more dynamic 

        //ba3deen ill add the specification pattern class and interface
        //=>most common way to implement specification pattern is to create a class that implements ISpecification<TEntity> interface
        //and then pass that class to the repository method that needs to use it.
        //but for now we will keep it simple and just implement the basic methods
        //and later we will refactor it to use specification pattern
        //another way to make it more dynamic is to use expression trees


        public async Task<IEnumerable<TEntity>> GetAllAsync()
            => await context.Set<TEntity>().ToListAsync();

        // GetAllAsync with Include support
        public async Task<IEnumerable<TEntity>> GetAllAsync(params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = context.Set<TEntity>();

            // Add each include
            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.ToListAsync();
        }

        public async Task<TEntity> GetByIdAsync(TKey id)
            => await context.Set<TEntity>().FindAsync(id);

        //  GetByIdAsync with Include support
        public async Task<TEntity?> GetByIdAsync(TKey id, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = context.Set<TEntity>();

            // Add each include
            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            // Find by ID
            return await query.FirstOrDefaultAsync(e => e.Id.Equals(id));
        }

        public async Task CreateAsync(TEntity entity)
            => await context.Set<TEntity>().AddAsync(entity);

        public void update(TEntity entity)
            => context.Set<TEntity>().Update(entity);

        public void delete(TEntity entity)
            => context.Set<TEntity>().Remove(entity);


        /////
        ///new get 
        public IQueryable<TEntity> GetQueryable(params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = context.Set<TEntity>();

            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            return query;
        }


    }
}
