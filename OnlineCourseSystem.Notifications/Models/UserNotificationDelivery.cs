namespace OnlineCourseSystem.Notifications.Models
{
    /// <summary>
    /// Tracks delivery status for a single channel (InApp, Email, Push)
    /// of a user notification.
    /// </summary>
    public class UserNotificationDelivery
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid UserNotificationId { get; set; }

        /// <summary>
        /// Delivery channel (e.g. InApp, Email, Push).
        /// Stored as string in the database for readability.
        /// </summary>
        public string Channel { get; set; } = null!;

        /// <summary>
        /// Delivery status (Pending, Sent, Failed).
        /// Stored as string in the database for readability.
        /// </summary>
        public string Status { get; set; } = null!;

        /// <summary>
        /// When the message was successfully delivered through the channel (UTC).
        /// </summary>
        public DateTime? DeliveredAt { get; set; }

        /// <summary>
        /// Error message from the provider or internal failure, if any.
        /// </summary>
        public string? ErrorMessage { get; set; }

        /// <summary>
        /// Identifier returned by the external provider (email/push) if available.
        /// </summary>
        public string? ProviderMessageId { get; set; }

        /// <summary>
        /// When this delivery tracking record was created (UTC).
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}