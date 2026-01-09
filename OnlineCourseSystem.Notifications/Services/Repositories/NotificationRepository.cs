using OnlineCourseSystem.Notifications.Models;
using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Models.Data;

namespace OnlineCourseSystem.Notifications.Services.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly NotificationsDbContext _context;

        public NotificationRepository(NotificationsDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<UserNotification?> GetNotificationByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.UserNotifications
                .FirstOrDefaultAsync(n => n.NotificationId == id, cancellationToken);
        }
    }
}
