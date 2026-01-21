using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Data;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories
{
    public class PushOutboxRepository : IPushOutboxRepository
    {
        private readonly NotificationsDbContext _context;

        public PushOutboxRepository(NotificationsDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IReadOnlyList<PushOutbox>> GetPendingItemsAsync(int batchSize, CancellationToken cancellationToken = default)
        {
            return await _context.PushOutbox
                .Where(x => x.Status == (byte)OutboxStatus.Pending && x.RetryCount < x.MaxRetries)
                .OrderBy(x => x.CreatedAt)
                .Take(batchSize)
                .ToListAsync(cancellationToken);
        }

        public async Task<PushOutbox?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.PushOutbox.FindAsync(new object[] { id }, cancellationToken);
        }

        public async Task MarkAsSentAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var item = await _context.PushOutbox.FindAsync(new object[] { id }, cancellationToken);
            if (item != null)
            {
                item.Status = (byte)OutboxStatus.Sent;
                item.SentAt = DateTime.UtcNow;
            }
        }

        public async Task MarkAsFailedAsync(Guid id, string error, CancellationToken cancellationToken = default)
        {
            var item = await _context.PushOutbox.FindAsync(new object[] { id }, cancellationToken);
            if (item != null)
            {
                item.Status = (byte)OutboxStatus.Failed;
                item.LastError = error;
            }
        }

        public async Task IncrementRetryCountAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var item = await _context.PushOutbox.FindAsync(new object[] { id }, cancellationToken);
            if (item != null)
            {
                item.RetryCount++;
            }
        }
    }
}
