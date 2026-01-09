using OnlineCourseSystem.Notifications.DTOs;

namespace OnlineCourseSystem.Notifications.Services
{
    public interface INotificationService
    {
        Task CreateNotificationAsync(CreateNotificationDto request);
        Task<List<UserNotificationDto>> GetUserNotificationsAsync(Guid userId, bool? isRead, int pageNumber, int pageSize);
    }
}
