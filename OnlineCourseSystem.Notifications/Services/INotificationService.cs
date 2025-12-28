using OnlineCourseSystem.Notifications.DTOs;

namespace OnlineCourseSystem.Notifications.Services
{
    public interface INotificationService
    {
        Task CreateNotificationAsync(CreateNotificationDto request);
    }
}
