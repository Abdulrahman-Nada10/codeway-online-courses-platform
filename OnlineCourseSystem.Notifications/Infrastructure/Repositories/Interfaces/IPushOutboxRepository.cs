using OnlineCourseSystem.Notifications.Models;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces
{
    public interface IPushOutboxRepository
    {
        Task<IReadOnlyList<PushOutbox>> GetPendingItemsAsync(int batchSize, CancellationToken cancellationToken = default);
        Task<PushOutbox?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task MarkAsSentAsync(Guid id, CancellationToken cancellationToken = default);
        Task MarkAsFailedAsync(Guid id, string error, CancellationToken cancellationToken = default);
        Task IncrementRetryCountAsync(Guid id, CancellationToken cancellationToken = default);
    }
}
