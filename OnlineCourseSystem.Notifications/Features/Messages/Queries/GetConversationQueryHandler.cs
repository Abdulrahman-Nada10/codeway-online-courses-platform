using MediatR;
using OnlineCourseSystem.Notifications.Exceptions;
using OnlineCourseSystem.Notifications.Features.Messages.DTOs;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork;

namespace OnlineCourseSystem.Notifications.Features.Messages.Queries
{
    public class GetConversationQueryHandler : IRequestHandler<GetConversationQuery, IReadOnlyList<MessageDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetConversationQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IReadOnlyList<MessageDto>> Handle(GetConversationQuery request, CancellationToken cancellationToken)
        {
            // Validate & Parse ConversationId first
            var (userAId, userBId, courseId) = ParseConversationId(request.ConversationId);

            // Defensive checks
            if (userAId == userBId)
                throw new BadRequestException(
                    "ConversationId cannot contain the same user for both participants.",
                    nameof(request.ConversationId));


            // Validate both users exist
            var usersExist = await _unitOfWork.UserReferences.AllUsersExistAsync(
                new[] { userAId, userBId });

            if (!usersExist)
            {
                throw new NotFoundException("Sender or receiver");
            }

            // ReaderId validation(if provided)
            if (request.ReaderId.HasValue)
            {
                var readerId = request.ReaderId.Value;

                // Reader must be one of the conversation participants (important security/business rule)
                if (readerId != userAId && readerId != userBId)
                {
                    throw new AccessDeniedException("Reader is not a participant in this conversation.");
                }

                var otherUserId = readerId == userAId ? userBId : userAId;

                await _unitOfWork.Messages.MarkConversationMessagesAsReadAsync(
                    readerId,
                    otherUserId,
                    courseId,
                    cancellationToken);

                await _unitOfWork.SaveChangesAsync(cancellationToken);
            }

            // Fetch paginated messages
            var messages = await _unitOfWork.Messages.GetConversationMessagesAsync(
                userAId,
                userBId,
                courseId,
                request.PageNumber,
                request.PageSize,
                cancellationToken);

            // Rebuild conversationId to ensure consistent formatting
            var conversationId = BuildConversationId(userAId, userBId, courseId);

            // Map to DTOs
            return messages
                .Select(m => new MessageDto
                {
                    Id = m.Id,
                    SenderId = m.SenderId,
                    ReceiverId = m.ReceiverId,
                    CourseId = m.CourseId,
                    Content = m.Content,
                    IsRead = m.IsRead,
                    SentAt = m.SentAt,
                    ConversationId = conversationId
                })
                .ToList();
        }

        /// <summary>
        /// Builds a unique conversation identifier for a pair of users, optionally scoped to a specific course.
        /// </summary>
        /// <returns>A string representing the unique conversation identifier for the specified users and, if provided, the
        /// course.</returns>
        private static string BuildConversationId(Guid userA, Guid userB, Guid? courseId)
        {
            var first = userA.CompareTo(userB) < 0 ? userA : userB;
            var second = userA.CompareTo(userB) < 0 ? userB : userA;

            return courseId.HasValue
                ? $"{first:N}_{second:N}_{courseId.Value:N}"
                : $"{first:N}_{second:N}";
        }

        /// <summary>
        /// Parses a conversation identifier string into its component user and course identifiers.
        /// </summary>
        /// <param name="conversationId">The conversation identifier string to parse. Must consist of two or three GUIDs separated by underscores,
        /// representing user A, user B, and optionally a course ID.</param>
        /// <returns>A tuple containing the GUIDs for user A, user B, and an optional course ID. The course ID is null if not
        /// present in the input string.</returns>
        private static (Guid userA, Guid userB, Guid? courseId) ParseConversationId(string conversationId)
        {
            if (string.IsNullOrWhiteSpace(conversationId))
                throw new BadRequestException("ConversationId is required.", nameof(conversationId));

            var parts = conversationId.Split('_', StringSplitOptions.RemoveEmptyEntries);

            if (parts.Length is < 2 or > 3)
                throw new BadRequestException("ConversationId format is invalid.", nameof(conversationId));

            if (!Guid.TryParse(parts[0], out var userA) ||
                !Guid.TryParse(parts[1], out var userB))
            {
                throw new BadRequestException("ConversationId user identifiers are invalid.", nameof(conversationId));
            }

            Guid? courseId = null;

            if (parts.Length == 3)
            {
                if (!Guid.TryParse(parts[2], out var parsedCourseId))
                    throw new BadRequestException("ConversationId course identifier is invalid.", nameof(conversationId));

                courseId = parsedCourseId;
            }

            return (userA, userB, courseId);
        }
    }
}

