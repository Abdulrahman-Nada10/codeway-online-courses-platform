using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Data;
using OnlineCourseSystem.Notifications.Models.Enums;
using OnlineCourseSystem.Notifications.Repositories.Interfaces;

namespace OnlineCourseSystem.Notifications.Repositories
{
    public class NotificationPreferenceRepository : INotificationPreferenceRepository
    {
        private readonly NotificationsDbContext _context;

        public NotificationPreferenceRepository(NotificationsDbContext context)
        {
            _context = context;
        }

        public async Task<List<NotificationPreference>> GetByUserIdAsync(Guid userId)
        {
            return await _context.NotificationPreferences
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        public async Task<NotificationPreference?> GetAsync(Guid userId,
            NotificationType notificationType)
        {
            return await _context.NotificationPreferences
                .FirstOrDefaultAsync(x =>
                    x.UserId == userId &&
                    x.NotificationType == notificationType);
        }

        public async Task AddRangeAsync(IEnumerable<NotificationPreference> preferences, CancellationToken cancellationToken)
        {
            await _context.NotificationPreferences.AddRangeAsync(preferences, cancellationToken);
        }
    }
}
