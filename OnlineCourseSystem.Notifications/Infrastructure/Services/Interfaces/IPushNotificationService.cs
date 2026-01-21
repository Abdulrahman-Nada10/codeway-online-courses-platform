namespace OnlineCourseSystem.Notifications.Infrastructure.Services.Interfaces
{
    public interface IPushNotificationService
    {
        Task<bool> SendPushNotificationAsync(Guid userId, string title, string body, CancellationToken cancellationToken = default);
    }
}
