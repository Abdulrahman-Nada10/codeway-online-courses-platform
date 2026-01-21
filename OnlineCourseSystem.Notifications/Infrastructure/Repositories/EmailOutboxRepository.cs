using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Data;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories
{
    public class EmailOutboxRepository : IEmailOutboxRepository
    {
        private readonly NotificationsDbContext _context;

        public EmailOutboxRepository(NotificationsDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IReadOnlyList<EmailOutbox>> GetPendingItemsAsync(int batchSize, CancellationToken cancellationToken = default)
        {
            return await _context.EmailOutbox
                .Where(x => x.Status == (byte)OutboxStatus.Pending && x.RetryCount < x.MaxRetries)
                .OrderBy(x => x.CreatedAt)
                .Take(batchSize)
                .ToListAsync(cancellationToken);
        }

        public async Task<EmailOutbox?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.EmailOutbox.FindAsync(new object[] { id }, cancellationToken);
        }
        public async Task MarkAsSentAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var item = await _context.EmailOutbox.FindAsync(new object[] { id }, cancellationToken);
            if (item != null)
            {
                item.Status = (byte)OutboxStatus.Sent;
                item.SentAt = DateTime.UtcNow;
            }
        }

        public async Task MarkAsFailedAsync(Guid id, string error, CancellationToken cancellationToken = default)
        {
            var item = await _context.EmailOutbox.FindAsync(new object[] { id }, cancellationToken);
            if (item != null)
            {
                item.Status = (byte)OutboxStatus.Failed;
                item.LastError = error;
            }
        }

        public async Task IncrementRetryCountAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var item = await _context.EmailOutbox.FindAsync(new object[] { id }, cancellationToken);
            if (item != null)
            {
                item.RetryCount++;
            }
        }
    }
}
