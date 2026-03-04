using OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Data;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories
{
    public class UserNotificationDeliveries : IUserNotificationDeliveries
    {
        private readonly NotificationsDbContext _context;

        public UserNotificationDeliveries(NotificationsDbContext context)
        {
            _context = context;
        }

        public async Task AddRangeAsync(IEnumerable<UserNotificationDelivery> deliveries, CancellationToken cancellationToken = default)
        {
            await _context.UserNotificationDeliveries.AddRangeAsync(deliveries, cancellationToken);
        }
    }
}
