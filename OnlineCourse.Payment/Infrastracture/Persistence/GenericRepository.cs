// ============================================================
// GenericRepository.cs - Implements IGenericRepository<T>
// ============================================================
// WHY THIS EXISTS:
//   Provides reusable CRUD operations for all entities.
//   OrderRepository and PaymentTransactionRepository inherit from this.
//
// TODO: Implement all methods using _context and DbSet<T>:
//   - GetAllAsync()         -> return await _context.Set<T>().ToListAsync()
//   - GetByIdAsync(id)      -> return await _context.Set<T>().FindAsync(id)
//   - CreateAsync(entity)   -> await _context.Set<T>().AddAsync(entity)
//   - Update(entity)        -> _context.Set<T>().Update(entity)
//   - Delete(entity)        -> _context.Set<T>().Remove(entity)

using Microsoft.EntityFrameworkCore;
using OnlineCourse.Payment.Core.Entities;
using OnlineCourse.Payment.Core.Repository;

namespace OnlineCourse.Payment.Infrastracture.Persistence
{
    public class GenericRepository<T>(ApplicationDbContext context) : IGenericRepository<T> where T : class
    {
        protected readonly ApplicationDbContext _context = context;
        protected readonly DbSet<T> _dbSet = context.Set<T>();

        // TODO: implement GetAllAsync
        public Task<IEnumerable<T>> GetAllAsync() => throw new NotImplementedException();

        // TODO: implement GetByIdAsync
        public Task<T?> GetByIdAsync(int id) => throw new NotImplementedException();

        // TODO: implement CreateAsync
        public Task CreateAsync(T entity) => throw new NotImplementedException();

        // TODO: implement Update
        public void Update(T entity) => throw new NotImplementedException();

        // TODO: implement Delete
        public void Delete(T entity) => throw new NotImplementedException();
    }
}
