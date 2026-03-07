using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces
{
    public interface INotificationPreferenceRepository : IGenericRepository<NotificationPreference>
    {
        Task<List<NotificationPreference>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);

        Task<NotificationPreference?> GetAsync(
            Guid userId,
            NotificationType notificationType,
            CancellationToken cancellationToken = default);

        Task AddRangeAsync(IEnumerable<NotificationPreference> preferences, CancellationToken cancellationToken = default);
    }
}