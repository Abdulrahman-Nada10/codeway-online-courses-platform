namespace OnlineCourseSystem.Notifications.Models
{
    public class PushOutbox
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string Title { get; set; } = null!;
        public string Body { get; set; } = null!;

        public byte Status { get; set; } // 0 Pending, 1 Sent, 2 Failed

        public int RetryCount { get; set; }
        public int MaxRetries { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? SentAt { get; set; }

        public string? LastError { get; set; }
    }
}
