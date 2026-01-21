using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces
{
    public interface IEmailOutboxRepository
    {
        Task<IReadOnlyList<EmailOutbox>> GetPendingItemsAsync(int batchSize, CancellationToken cancellationToken = default);
        Task<EmailOutbox?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task MarkAsSentAsync(Guid id, CancellationToken cancellationToken = default);
        Task MarkAsFailedAsync(Guid id, string error, CancellationToken cancellationToken = default);
        Task IncrementRetryCountAsync(Guid id, CancellationToken cancellationToken = default);
    }
}
