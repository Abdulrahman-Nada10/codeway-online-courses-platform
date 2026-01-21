using OnlineCourseSystem.Notifications.Models;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces
{
    public interface IScheduledNotificationRepository
    {
        Task<IReadOnlyList<ScheduledNotification>> GetDueNotificationsAsync(int batchSize, CancellationToken cancellationToken = default);
        Task MarkAsProcessedAsync(Guid id, CancellationToken cancellationToken = default);
        Task MarkAsFailedAsync(Guid id, string error, CancellationToken cancellationToken = default);
        Task AddAsync(ScheduledNotification notification, CancellationToken cancellationToken = default);
    }
}
