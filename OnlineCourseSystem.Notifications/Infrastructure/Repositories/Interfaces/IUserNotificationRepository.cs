using OnlineCourseSystem.Notifications.Models;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces
{
    public interface IUserNotificationRepository
    {
        Task<UserNotification?> GetUserNotificationByIdAsync(Guid id, CancellationToken cancellationToken = default);
    }
}
