namespace OnlineCourseSystem.Notifications.Models
{
    public class Message
    {
        public Guid Id { get; set; }

        public Guid SenderId { get; set; }

        public Guid ReceiverId { get; set; }

        public Guid? CourseId { get; set; }

        public string Content { get; set; } = null!;

        public bool IsRead { get; set; } = false;

        public DateTime SentAt { get; set; } = DateTime.UtcNow;
    }
}
