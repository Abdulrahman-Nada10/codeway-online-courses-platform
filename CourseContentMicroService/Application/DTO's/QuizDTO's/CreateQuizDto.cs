namespace CourseContentMicroService.Application.DTO_s.QuizDTO_s
{
    public class CreateQuizDto
    {
        public int LessonId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal TotalMarks { get; set; }
        public int? TimeLimitMinutes { get; set; } // Nullable - no time limit if null
    }
}
