using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Data;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Services.Repositories
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

        public async Task AddRangeAsync(IEnumerable<NotificationPreference> preferences)
        {
            await _context.NotificationPreferences.AddRangeAsync(preferences);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(NotificationPreference preference)
        {
            _context.NotificationPreferences.Update(preference);
            await _context.SaveChangesAsync();
        }
    }
}
