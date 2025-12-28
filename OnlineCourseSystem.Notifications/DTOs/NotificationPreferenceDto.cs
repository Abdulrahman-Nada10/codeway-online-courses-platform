using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.DTOs
{
    public class NotificationPreferenceDto
    {
        public NotificationType NotificationType { get; set; }

        public bool InApp { get; set; }
        public bool Email { get; set; }
        public bool Push { get; set; }
    }
    public class UpdateNotificationPreferenceDto
    {
        public NotificationType NotificationType { get; set; }

        public bool Email { get; set; }
        public bool Push { get; set; }
    }

}
