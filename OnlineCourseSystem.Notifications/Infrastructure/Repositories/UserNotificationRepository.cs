using OnlineCourseSystem.Notifications.Models;
using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Models.Data;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories
{
    public class UserNotificationRepository : IUserNotificationRepository
    {
        private readonly NotificationsDbContext _context;

        public UserNotificationRepository(NotificationsDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<UserNotification?> GetUserNotificationByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.UserNotifications
                .FirstOrDefaultAsync(n => n.Id == id, cancellationToken);
        }
    }
}
