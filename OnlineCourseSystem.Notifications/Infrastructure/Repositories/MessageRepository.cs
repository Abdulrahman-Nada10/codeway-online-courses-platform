using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Data;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly NotificationsDbContext _context;

        public MessageRepository(NotificationsDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task AddAsync(Message message, CancellationToken cancellationToken = default)
        {
            await _context.Messages.AddAsync(message, cancellationToken);
        }

        public async Task<IReadOnlyList<Message>> GetConversationMessagesAsync(
            Guid userAId,
            Guid userBId,
            Guid? courseId,
            int pageNumber,
            int pageSize,
            CancellationToken cancellationToken = default)
        {
            if (pageNumber <= 0)
            {
                pageNumber = 1;
            }

            if (pageSize <= 0)
            {
                pageSize = 20;
            }

            var query = _context.Messages
                .AsNoTracking()
                .Where(m =>
                    ((m.SenderId == userAId && m.ReceiverId == userBId) ||
                     (m.SenderId == userBId && m.ReceiverId == userAId)) &&
                    m.CourseId == courseId)
                .OrderBy(m => m.SentAt);

            return await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);
        }

        public async Task MarkConversationMessagesAsReadAsync(
            Guid readerId,
            Guid otherUserId,
            Guid? courseId,
            CancellationToken cancellationToken = default)
        {
            var messages = await _context.Messages
                .Where(m =>
                    m.ReceiverId == readerId &&
                    m.SenderId == otherUserId &&
                    m.CourseId == courseId &&
                    !m.IsRead)
                .ToListAsync(cancellationToken);

            if (messages.Count() == 0)
            {
                return;
            }

            foreach (var message in messages)
            {
                message.IsRead = true;
            }
        }
    }
}


