namespace OnlineCourseSystem.Notifications.Models
{
    public class EmailOutbox
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string ToEmail { get; set; } = null!;
        public string Subject { get; set; } = null!;
        public string Body { get; set; } = null!;
        public byte Status { get; set; } // 0 Pending, 1 Sent, 2 Failed
        public int RetryCount { get; set; }
        public int MaxRetries { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? SentAt { get; set; }
        public string? LastError { get; set; }

    }
}
