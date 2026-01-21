using MediatR;

namespace OnlineCourseSystem.Notifications.Features.Notifications.Commands.MarkAsRead
{
    public class MarkNotificationAsReadCommand : IRequest
    {
        public Guid UserNotificationId { get; }
        public MarkNotificationAsReadCommand(Guid userNotificationId)
        {
            UserNotificationId = userNotificationId;
        }
    }
}
