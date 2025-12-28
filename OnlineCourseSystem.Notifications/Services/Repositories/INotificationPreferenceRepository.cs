using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Services.Repositories
{
    public interface INotificationPreferenceRepository
    {
        Task<List<NotificationPreference>> GetByUserIdAsync(Guid userId);

        // Gets a specific notification preference for a user by notification type (Email / Push)
        Task<NotificationPreference?> GetAsync(
            Guid userId,
            NotificationType notificationType);

        // Adds a new notification preference (Lazy Default Creation)
        Task AddRangeAsync(IEnumerable<NotificationPreference> preferences);

        Task UpdateAsync(NotificationPreference preference);
    }
}