using OnlineCourseSystem.Notifications.Features.Notifications.DTOs;

namespace OnlineCourseSystem.Notifications.Infrastructure.Services.Interfaces
{
    public interface INotificationService
    {
        Task<List<Guid>> CreateNotificationAsync(CreateNotificationDto request);
        Task<List<UserNotificationDto>> GetUserNotificationsAsync(Guid userId, bool? isRead, int pageNumber, int pageSize);
    }
}
