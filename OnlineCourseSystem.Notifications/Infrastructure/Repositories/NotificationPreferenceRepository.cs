using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Data;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories
{
    /// <summary>
    /// Specialized repository that extends the generic repository to add user-centric queries.
    /// Demonstrates how domain-specific methods can coexist with the reusable CRUD surface.
    /// </summary>
    public class NotificationPreferenceRepository : GenericRepository<NotificationPreference>, INotificationPreferenceRepository
    {
        public NotificationPreferenceRepository(NotificationsDbContext context) : base(context)
        {
        }

        public async Task<List<NotificationPreference>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            return await DbSet
                .AsNoTracking()
                .Where(x => x.UserId == userId)
                .ToListAsync(cancellationToken);
        }

        public async Task<NotificationPreference?> GetAsync(
            Guid userId,
            NotificationType notificationType,
            CancellationToken cancellationToken = default)
        {
            return await DbSet
                .AsNoTracking()
                .FirstOrDefaultAsync(x =>
                    x.UserId == userId &&
                    x.NotificationType == notificationType,
                    cancellationToken);
        }

        public async Task AddRangeAsync(IEnumerable<NotificationPreference> preferences, CancellationToken cancellationToken = default)
        {
            await base.AddRangeAsync(preferences, cancellationToken);
        }
    }
}
