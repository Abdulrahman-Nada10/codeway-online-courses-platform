namespace OnlineCourseSystem.Notifications.Models
{
    public class UserNotification
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid NotificationId { get; set; }

        public Guid UserId { get; set; }

        public bool IsRead { get; set; } = false;

        public DateTime? ReadAt { get; set; }

        public DateTime? DeliveredAt { get; set; }

        // Navigation
        public Notification Notification { get; set; } = null!;
    }
}
