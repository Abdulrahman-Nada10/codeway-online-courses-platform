using MediatR;

namespace OnlineCourseSystem.Notifications.Features.Notifications.Commands.MarkAsRead
{
    public class MarkNotificationAsReadCommand : IRequest
    {
        public Guid NotificationId { get; }
        public MarkNotificationAsReadCommand(Guid notificationId)
        {
            NotificationId = notificationId;
        }
    }
}
