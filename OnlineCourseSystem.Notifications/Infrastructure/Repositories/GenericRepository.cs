using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces;
using OnlineCourseSystem.Notifications.Models.Data;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories
{
    /// <summary>
    /// Default Entity Framework Core based implementation of <see cref="IGenericRepository{TEntity}"/>.
    /// </summary>
    /// <typeparam name="TEntity">Entity type managed by this repository.</typeparam>
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        /// <summary>
        /// Gets the underlying <see cref="NotificationsDbContext"/>.
        /// </summary>
        protected NotificationsDbContext Context { get; }

        /// <summary>
        /// Gets the <see cref="DbSet{TEntity}"/> for the managed entity type.
        /// </summary>
        protected DbSet<TEntity> DbSet { get; }

        public GenericRepository(NotificationsDbContext context)
        {
            Context = context ?? throw new ArgumentNullException(nameof(context));
            DbSet = Context.Set<TEntity>();
        }

        /// <inheritdoc />
        public virtual async Task<TEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await DbSet
                .AsNoTracking()
                .FirstOrDefaultAsync(entity => EF.Property<Guid>(entity, "Id") == id, cancellationToken);
        }

        /// <inheritdoc />
        public virtual async Task<IReadOnlyList<TEntity>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await DbSet
                .AsNoTracking()
                .ToListAsync(cancellationToken);
        }

        /// <inheritdoc />
        public virtual IQueryable<TEntity> Query()
        {
            return DbSet.AsNoTracking();
        }

        /// <inheritdoc />
        public virtual async Task AddAsync(TEntity entity, CancellationToken cancellationToken = default)
        {
            await DbSet.AddAsync(entity, cancellationToken);
        }

        /// <inheritdoc />
        public virtual async Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default)
        {
            await DbSet.AddRangeAsync(entities, cancellationToken);
        }

        /// <inheritdoc />
        public virtual void Update(TEntity entity)
        {
            DbSet.Update(entity);
        }

        /// <inheritdoc />
        public virtual void Remove(TEntity entity)
        {
            DbSet.Remove(entity);
        }

        /// <inheritdoc />
        public virtual void RemoveRange(IEnumerable<TEntity> entities)
        {
            DbSet.RemoveRange(entities);
        }

        /// <inheritdoc />
        public virtual async Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await DbSet
                .AsNoTracking()
                .AnyAsync(entity => EF.Property<Guid>(entity, "Id") == id, cancellationToken);
        }

        /// <inheritdoc />
        public virtual async Task<int> CountAsync(CancellationToken cancellationToken = default)
        {
            return await DbSet
                .AsNoTracking()
                .CountAsync(cancellationToken);
        }
    }
}
