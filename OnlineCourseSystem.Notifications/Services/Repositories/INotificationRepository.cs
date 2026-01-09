using OnlineCourseSystem.Notifications.Models;

namespace OnlineCourseSystem.Notifications.Services.Repositories
{
    public interface INotificationRepository
    {
        Task<UserNotification?> GetNotificationByIdAsync(Guid id, CancellationToken cancellationToken = default);
    }
}
