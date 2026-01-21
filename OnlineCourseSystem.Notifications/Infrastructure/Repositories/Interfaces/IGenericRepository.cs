using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces
{
    /// <summary>
    /// Defines reusable data-access operations for aggregate roots stored through Entity Framework Core.
    /// </summary>
    /// <typeparam name="TEntity">Entity type managed by the repository.</typeparam>
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        /// <summary>
        /// Retrieves an entity by its Guid identifier.
        /// </summary>
        /// <param name="id">Entity identifier.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>The entity instance if found; otherwise <c>null</c>.</returns>
        Task<TEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

        /// <summary>
        /// Returns all entities as a read-only list.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>Collection of entities.</returns>
        Task<IReadOnlyList<TEntity>> GetAllAsync(CancellationToken cancellationToken = default);

        /// <summary>
        /// Provides an <see cref="IQueryable{TEntity}"/> for advanced filtering and composition.
        /// Results are configured to be non-tracking by default.
        /// </summary>
        /// <returns>Queryable source.</returns>
        IQueryable<TEntity> Query();

        /// <summary>
        /// Adds a single entity to the context for insertion.
        /// </summary>
        /// <param name="entity">Entity to add.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        Task AddAsync(TEntity entity, CancellationToken cancellationToken = default);

        /// <summary>
        /// Adds multiple entities to the context for insertion.
        /// </summary>
        /// <param name="entities">Entities to add.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default);

        /// <summary>
        /// Marks an entity as modified.
        /// </summary>
        /// <param name="entity">Entity to update.</param>
        void Update(TEntity entity);

        /// <summary>
        /// Removes a single entity from the set.
        /// </summary>
        /// <param name="entity">Entity to remove.</param>
        void Remove(TEntity entity);

        /// <summary>
        /// Removes a collection of entities from the set.
        /// </summary>
        /// <param name="entities">Entities to remove.</param>
        void RemoveRange(IEnumerable<TEntity> entities);

        /// <summary>
        /// Checks if an entity exists by its Guid identifier.
        /// </summary>
        /// <param name="id">Entity identifier.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns><c>true</c> if it exists; otherwise <c>false</c>.</returns>
        Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default);

        /// <summary>
        /// Counts entities in the underlying set.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>Total number of entities.</returns>
        Task<int> CountAsync(CancellationToken cancellationToken = default);
    }
}
