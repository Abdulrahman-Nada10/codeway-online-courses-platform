namespace CourseContentMicroService.Application.DTO_s.QuizDTO_s
{
    public class QuizDto
    {
        public int Id { get; set; }
        public int LessonId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal TotalMarks { get; set; }
        public int? TimeLimitMinutes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
