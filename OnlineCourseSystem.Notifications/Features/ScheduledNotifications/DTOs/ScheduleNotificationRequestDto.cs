using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Features.ScheduledNotifications.DTOs
{
    /// <summary>
    /// DTO for scheduling a notification.
    /// </summary>
    public class ScheduleNotificationRequestDto
    {
        public NotificationType NotificationType { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public Guid? CourseId { get; set; }
        public List<Guid> UserIds { get; set; } = new();

        /// <summary>
        /// Gets or sets the date and time when the notification is scheduled for.
        /// </summary>
        public DateTime ScheduledFor { get; set; }
    }
}
