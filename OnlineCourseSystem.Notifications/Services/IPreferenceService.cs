using OnlineCourseSystem.Notifications.DTOs;

namespace OnlineCourseSystem.Notifications.Services
{
    public interface IPreferenceService
    {
        Task<List<NotificationPreferenceDto>> GetAsync(Guid userId);
        Task UpdateAsync(Guid userId, UpdateNotificationPreferenceDto dto);
    }
}
