using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Models
{
    public class NotificationPreference
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public NotificationType NotificationType { get; set; }

        public bool InApp { get; set; } = true;

        public bool Email { get; set; } = false;

        public bool Push { get; set; } = false;
    }
}
