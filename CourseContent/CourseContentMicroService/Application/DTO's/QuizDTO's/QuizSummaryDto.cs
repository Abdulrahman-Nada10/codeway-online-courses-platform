namespace CourseContentMicroService.Application.DTO_s.QuizDTO_s
{
    public class QuizSummaryDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal TotalMarks { get; set; }
        public int? TimeLimitMinutes { get; set; }
        public int TotalQuestions { get; set; }
        public bool IsCompleted { get; set; }
        public decimal? StudentScore { get; set; } // Nullable - only if completed
    }
}
