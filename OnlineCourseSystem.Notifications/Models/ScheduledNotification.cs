namespace OnlineCourseSystem.Notifications.Models
{
    /// <summary>
    /// Represents a scheduled notification that should be sent at a specific time.
    /// </summary>
    public class ScheduledNotification
    {
        public Guid Id { get; set; }

        /// <summary>
        /// The notification type (e.g., Reminder, AssignmentDue).
        /// </summary>
        public string NotificationType { get; set; } = null!;

        /// <summary>
        /// Title of the notification.
        /// </summary>
        public string Title { get; set; } = null!;

        /// <summary>
        /// Content/body of the notification.
        /// </summary>
        public string Content { get; set; } = null!;

        /// <summary>
        /// Optional course ID if notification is course-related.
        /// </summary>
        public Guid? CourseId { get; set; }

        /// <summary>
        /// List of user IDs to receive this notification.
        /// </summary>
        public string UserIdsJson { get; set; } = null!; // JSON array of Guid strings

        /// <summary>
        /// When the notification should be sent.
        /// </summary>
        public DateTime ScheduledFor { get; set; }

        /// <summary>
        /// Whether the notification has been processed/sent.
        /// </summary>
        public bool IsProcessed { get; set; } = false;

        /// <summary>
        /// When the notification was processed (if processed).
        /// </summary>
        public DateTime? ProcessedAt { get; set; }

        /// <summary>
        /// When the record was created.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Optional error message if processing failed.
        /// </summary>
        public string? ErrorMessage { get; set; }
    }
}
