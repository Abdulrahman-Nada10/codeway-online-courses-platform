using MediatR;
using OnlineCourseSystem.Notifications.Exceptions;
using OnlineCourseSystem.Notifications.Features.Messages.DTOs;
using OnlineCourseSystem.Notifications.Features.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork;
using OnlineCourseSystem.Notifications.Infrastructure.Services.Interfaces;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Features.Messages.Commands
{
    public class SendMessageCommandHandler : IRequestHandler<SendMessageCommand, MessageDto>
    {
        private const int NotificationPreviewMaxLength = 100;

        private readonly IUnitOfWork _unitOfWork;
        private readonly INotificationService _notificationService;
        private readonly ILogger<SendMessageCommandHandler> _logger;

        public SendMessageCommandHandler(
            IUnitOfWork unitOfWork,
            INotificationService notificationService,
            ILogger<SendMessageCommandHandler> logger)
        {
            _unitOfWork = unitOfWork;
            _notificationService = notificationService;
            _logger = logger;
        }

        public async Task<MessageDto> Handle(SendMessageCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Request;

            // Validate both users exist
            var usersExist = await _unitOfWork.UserReferences.AllUsersExistAsync(
                new[] { dto.SenderId, dto.ReceiverId });

            if (!usersExist)
            {
                throw new NotFoundException("Sender or receiver");
            }

            // TODO: validate CourseId after integration with Courses service (if required)

            var entity = new Message
            {
                Id = Guid.NewGuid(),
                SenderId = dto.SenderId,
                ReceiverId = dto.ReceiverId,
                CourseId = dto.CourseId,
                Content = dto.Content.Trim(),
                IsRead = false,
                SentAt = DateTime.UtcNow
            };

            await _unitOfWork.Messages.AddAsync(entity, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            // Trigger notification (best effort - no rollback if it fails)
            await TryTriggerNewMessageNotificationAsync(dto, entity.Id, cancellationToken);
         
            var conversationId = BuildConversationId(
                dto.SenderId,
                dto.ReceiverId,
                dto.CourseId);

            return new MessageDto
            {
                Id = entity.Id,
                SenderId = entity.SenderId,
                ReceiverId = entity.ReceiverId,
                CourseId = entity.CourseId,
                Content = entity.Content,
                IsRead = entity.IsRead,
                SentAt = entity.SentAt,
                ConversationId = conversationId
            };
        }

        /// <summary>
        /// Triggers a notification to the receiver when a new message is received.
        /// </summary>
        private async Task TryTriggerNewMessageNotificationAsync(
            CreateMessageDto messageDto,
            Guid messageId,
            CancellationToken cancellationToken)
        {
            try
            {
                var preview = BuildNotificationPreview(messageDto.Content);

                var notificationRequest = new CreateNotificationDto
                {
                    NotificationType = messageDto.CourseId.HasValue
                        ? NotificationType.Course
                        : NotificationType.System,

                    Title = "New Message",
                    Content = $"You have a new message: {preview}",
                    CourseId = messageDto.CourseId,
                    UserIds = new List<Guid> { messageDto.ReceiverId }
                };

                await _notificationService.CreateNotificationAsync(notificationRequest);

                _logger.LogInformation(
                    "New message notification triggered. MessageId={MessageId}, ReceiverId={ReceiverId}",
                    messageId, messageDto.ReceiverId);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(
                    ex,
                    "Failed to trigger new message notification. MessageId={MessageId}, ReceiverId={ReceiverId}",
                    messageId, messageDto.ReceiverId);
            }
        }

        // =========================
        // Helpers
        // =========================
        private static string BuildNotificationPreview(string content)
        {
            content = content.Trim();

            if (content.Length <= NotificationPreviewMaxLength)
                return content;

            return content[..NotificationPreviewMaxLength] + "...";
        }

        private static string BuildConversationId(Guid userA, Guid userB, Guid? courseId)
        {
            var first = userA.CompareTo(userB) < 0 ? userA : userB;
            var second = userA.CompareTo(userB) < 0 ? userB : userA;

            return courseId.HasValue
                ? $"{first:N}_{second:N}_{courseId.Value:N}"
                : $"{first:N}_{second:N}";
        }
    }
}

