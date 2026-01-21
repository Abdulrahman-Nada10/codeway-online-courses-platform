using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Data;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories
{
    public class ScheduledNotificationRepository : IScheduledNotificationRepository
    {
        private readonly NotificationsDbContext _context;

        public ScheduledNotificationRepository(NotificationsDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IReadOnlyList<ScheduledNotification>> GetDueNotificationsAsync(int batchSize, CancellationToken cancellationToken = default)
        {
            var now = DateTime.UtcNow;
            return await _context.ScheduledNotifications
                .Where(x => !x.IsProcessed && x.ScheduledFor <= now)
                .OrderBy(x => x.ScheduledFor)
                .Take(batchSize)
                .ToListAsync(cancellationToken);
        }

        public async Task MarkAsProcessedAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var item = await _context.ScheduledNotifications.FindAsync(new object[] { id }, cancellationToken);
            if (item != null)
            {
                item.IsProcessed = true;
                item.ProcessedAt = DateTime.UtcNow;
            }
        }

        public async Task MarkAsFailedAsync(Guid id, string error, CancellationToken cancellationToken = default)
        {
            var item = await _context.ScheduledNotifications.FindAsync(new object[] { id }, cancellationToken);
            if (item != null)
            {
                item.ErrorMessage = error;
            }
        }

        public async Task AddAsync(ScheduledNotification notification, CancellationToken cancellationToken = default)
        {
            await _context.ScheduledNotifications.AddAsync(notification, cancellationToken);
        }
    }
}
