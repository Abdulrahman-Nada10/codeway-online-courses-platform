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
        /// <summary>
        /// Retrieves a list of notification preferences for a user by their ID.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <param name="cancellationToken">A token to cancel the operation.</param>
        /// <returns>A list of notification preferences.</returns>
        Task<List<NotificationPreference>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);

        /// <summary>
        /// Retrieves a specific notification preference for a user by notification type (Email / Push).
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <param name="notificationType">The type of notification.</param>
        /// <param name="cancellationToken">A token to cancel the operation.</param>
        /// <returns>The notification preference, or null if not found.</returns>
        Task<NotificationPreference?> GetAsync(
            Guid userId,
            NotificationType notificationType,
            CancellationToken cancellationToken = default);

        /// <summary>
        /// Adds a new notification preference (Lazy Default Creation).
        /// </summary>
        /// <param name="preferences">A collection of notification preferences to add.</param>
        /// <param name="cancellationToken">A token to cancel the operation.</param>
        Task AddRangeAsync(IEnumerable<NotificationPreference> preferences, CancellationToken cancellationToken = default);
    }
}