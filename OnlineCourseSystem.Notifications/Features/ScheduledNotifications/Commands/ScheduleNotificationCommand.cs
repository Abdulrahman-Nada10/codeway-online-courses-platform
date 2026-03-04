using MediatR;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Features.ScheduledNotifications.Commands
{
    public class ScheduleNotificationCommand : IRequest<Guid>
    {
        public NotificationType NotificationType { get; }
        public string Title { get; }
        public string Content { get; }
        public Guid? CourseId { get; }
        public List<Guid> UserIds { get; }
        public DateTime ScheduledFor { get; }

        public ScheduleNotificationCommand(
            NotificationType notificationType,
            string title,
            string content,
            List<Guid> userIds,
            DateTime scheduledFor,
            Guid? courseId = null)
        {
            NotificationType = notificationType;
            Title = title;
            Content = content;
            UserIds = userIds;
            ScheduledFor = scheduledFor;
            CourseId = courseId;
        }
    }
}
