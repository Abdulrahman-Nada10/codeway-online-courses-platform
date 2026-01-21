using OnlineCourseSystem.Notifications.Models;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces
{
    public interface IUserNotificationDeliveries
    {
        Task AddRangeAsync(IEnumerable<UserNotificationDelivery> deliveries, CancellationToken cancellationToken = default);
    }
}
