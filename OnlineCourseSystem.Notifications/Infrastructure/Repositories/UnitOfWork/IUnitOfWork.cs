using OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces;
using System;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork
{
    public interface IUnitOfWork
    {
        IUserNotificationRepository Notifications { get; }
        INotificationPreferenceRepository NotificationPreferences { get; }
        IUserReferenceRepository UserReferences { get; }
        IMessageRepository Messages { get; }
        IEmailOutboxRepository EmailOutbox { get; }
        IPushOutboxRepository PushOutbox { get; }
        IUserDevicesRepository UserDevices { get; }
        IScheduledNotificationRepository ScheduledNotifications { get; }
        IUserNotificationDeliveries UserNotificationDeliveries { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : class;
    }
}