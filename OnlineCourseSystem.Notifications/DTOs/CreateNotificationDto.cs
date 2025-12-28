using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.DTOs
{
    public class CreateNotificationDto
    {
        public NotificationType NotificationType { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public Guid? CourseId { get; set; }

        // Users to notify
        public List<Guid> UserIds { get; set; } = new();
    }
}
