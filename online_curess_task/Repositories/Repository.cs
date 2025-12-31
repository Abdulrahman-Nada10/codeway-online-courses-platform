using Microsoft.EntityFrameworkCore;
using online_curess_task.Data;
using online_curess_task.Repositories.IRepositories;
using System.Linq;
using System.Linq.Expressions;

namespace online_curess_task.Repositories
{
    public class Repository<T> : IRepositery<T> where T : class
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<T> _db;

        public Repository(ApplicationDbContext context) 
        {
            _context = context;
            _db = _context.Set<T>();
        }


        // CRUD
        public async Task CreateAsync(T entity)
        {
            await _db.AddAsync(entity);
        }

        public void Edit(T entity)
        {
            _db.Update(entity);
        }

        public void Delete(T entity)
        {
            _db.Remove(entity);
        }

        public async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>>? filter = null, Expression<Func<T, object>>[]? includes = null, bool tracked = true)
        {
            var entities = _db.AsQueryable<T>();

            if (filter is not null)
            {
                entities = entities.Where(filter);
            }

            if (includes is not null)
            {
                foreach (var item in includes)
                {
                    entities = entities.Include(item);
                }
            }

            if (!tracked)
            {
                entities = entities.AsNoTracking();
            }

            return await entities.ToListAsync();
        }

        public async Task<T?> GetOneAsync(Expression<Func<T, bool>>? filter = null, Expression<Func<T, object>>[]? includes = null, bool tracked = true)
        {
            return (await GetAsync(filter, includes, tracked)).FirstOrDefault();
        }

        public async Task<bool> CommitAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
        }
    }
}
