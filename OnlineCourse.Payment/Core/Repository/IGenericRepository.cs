// ============================================================
// IGenericRepository.cs - Base contract for all repositories
// ============================================================
// WHY THIS EXISTS:
//   Defines the standard CRUD operations every repository must have.
//   Keeps code DRY - implement once in GenericRepository, inherit everywhere.

namespace OnlineCourse.Payment.Core.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T?> GetByIdAsync(int id);
        Task CreateAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
