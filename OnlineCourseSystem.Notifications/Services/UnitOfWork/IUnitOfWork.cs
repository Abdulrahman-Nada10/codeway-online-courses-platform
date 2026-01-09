using OnlineCourseSystem.Notifications.Services.Repositories;

namespace OnlineCourseSystem.Notifications.Services.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        INotificationRepository Notifications { get; }
        INotificationPreferenceRepository NotificationPreferences { get; }
        IUserReferenceRepository UserReferences { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        Task BeginTransactionAsync(CancellationToken cancellationToken = default);
        Task CommitTransactionAsync(CancellationToken cancellationToken = default);
        Task RollbackTransactionAsync(CancellationToken cancellationToken = default);
    }
}