using MediatR;
using OnlineCourseSystem.Notifications.Features.Messages.DTOs;

namespace OnlineCourseSystem.Notifications.Features.Messages.Queries
{
    public class GetConversationQuery : IRequest<IReadOnlyList<MessageDto>>
    {
        public string ConversationId { get; }
        public int PageNumber { get; }
        public int PageSize { get; }
        public Guid? ReaderId { get; }

        public GetConversationQuery(
            string conversationId,
            int pageNumber,
            int pageSize,
            Guid? readerId = null)
        {
            ConversationId = conversationId;
            PageNumber = pageNumber;
            PageSize = pageSize;
            ReaderId = readerId;
        }
    }
}

