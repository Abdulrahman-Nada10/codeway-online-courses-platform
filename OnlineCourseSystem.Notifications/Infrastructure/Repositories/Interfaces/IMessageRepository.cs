using OnlineCourseSystem.Notifications.Models;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces
{
    public interface IMessageRepository
    {
        Task AddAsync(Message message, CancellationToken cancellationToken = default);

        Task<IReadOnlyList<Message>> GetConversationMessagesAsync(
            Guid userAId,
            Guid userBId,
            Guid? courseId,
            int pageNumber,
            int pageSize,
            CancellationToken cancellationToken = default);

        Task MarkConversationMessagesAsReadAsync(
            Guid readerId,
            Guid otherUserId,
            Guid? courseId,
            CancellationToken cancellationToken = default);
    }
}


