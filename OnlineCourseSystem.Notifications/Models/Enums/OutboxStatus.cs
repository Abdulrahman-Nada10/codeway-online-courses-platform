namespace OnlineCourseSystem.Notifications.Models.Enums
{
    /// <summary>
    /// Represents the status of an outbox item (Email or Push).
    /// </summary>
    public enum OutboxStatus : byte
    {
        /// <summary>
        /// Item is pending processing.
        /// </summary>
        Pending = 0,

        /// <summary>
        /// Item has been successfully sent.
        /// </summary>
        Sent = 1,

        /// <summary>
        /// Item failed to send after all retry attempts.
        /// </summary>
        Failed = 2
    }
}
