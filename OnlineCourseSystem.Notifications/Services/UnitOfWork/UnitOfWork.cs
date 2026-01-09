using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using OnlineCourseSystem.Notifications.Models.Data;
using OnlineCourseSystem.Notifications.Services.Repositories;

namespace OnlineCourseSystem.Notifications.Services.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly NotificationsDbContext _context;
        private IDbContextTransaction? _transaction;
        private bool _disposed;

        private INotificationRepository? _notifications;
        private INotificationPreferenceRepository? _notificationPreferences;
        private IUserReferenceRepository? _userReferences;

        public UnitOfWork(NotificationsDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public INotificationRepository Notifications
        {
            get
            {
                _notifications ??= new NotificationRepository(_context);
                return _notifications;
            }
        }

        public INotificationPreferenceRepository NotificationPreferences
        {
            get
            {
                _notificationPreferences ??= new NotificationPreferenceRepository(_context);
                return _notificationPreferences;
            }
        }

        public IUserReferenceRepository UserReferences
        {
            get
            {
                _userReferences ??= new UserReferenceRepository(_context);
                return _userReferences;
            }
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task BeginTransactionAsync(CancellationToken cancellationToken = default)
        {
            _transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
        }

        public async Task CommitTransactionAsync(CancellationToken cancellationToken = default)
        {
            try
            {
                await _context.SaveChangesAsync(cancellationToken);
                
                if (_transaction != null)
                {
                    await _transaction.CommitAsync(cancellationToken);
                }
            }
            catch
            {
                await RollbackTransactionAsync(cancellationToken);
                throw;
            }
            finally
            {
                if (_transaction != null)
                {
                    await _transaction.DisposeAsync();
                    _transaction = null;
                }
            }
        }

        public async Task RollbackTransactionAsync(CancellationToken cancellationToken = default)
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync(cancellationToken);
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _transaction?.Dispose();
                    _context.Dispose();
                }

                _disposed = true;
            }
        }
    }
}