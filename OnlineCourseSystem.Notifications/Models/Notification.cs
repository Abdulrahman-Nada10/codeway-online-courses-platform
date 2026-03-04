using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Models
{
    public class Notification
    {
        public Guid Id { get; set; }

        public NotificationType Type { get; set; }

        public string Title { get; set; } = null!;

        public string Content { get; set; } = null!;

        public Guid? CourseId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ExpiryAt { get; set; }

        // Navigation
        public ICollection<UserNotification> UserNotifications { get; set; }
            = new List<UserNotification>();
    }
}
