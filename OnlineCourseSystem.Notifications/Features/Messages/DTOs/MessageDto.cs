namespace OnlineCourseSystem.Notifications.Features.Messages.DTOs
{
    public class MessageDto
    {
        public Guid Id { get; set; }

        public Guid SenderId { get; set; }

        public Guid ReceiverId { get; set; }

        public Guid? CourseId { get; set; }

        public string Content { get; set; } = null!;

        public bool IsRead { get; set; }

        public DateTime SentAt { get; set; }

        /// <summary>
        /// Logical conversation identifier derived from the participants (and optionally course).
        /// </summary>
        public string ConversationId { get; set; } = null!;
    }

    public class CreateMessageDto
    {
        public Guid SenderId { get; set; }

        public Guid ReceiverId { get; set; }

        public Guid? CourseId { get; set; }

        public string Content { get; set; } = null!;
    }
}


