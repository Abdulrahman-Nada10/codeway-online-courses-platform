namespace CourseContentMicroService.Application.DTO_s.AnswersDTO_s
{
    public class QuizAnswerDto
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string QuestionText { get; set; } = string.Empty;
        public decimal QuestionMarks { get; set; }
        public int? SelectedOptionId { get; set; }
        public string? SelectedOptionText { get; set; }
        public string? AnswerText { get; set; }
        public decimal Score { get; set; }
        public bool? IsCorrect { get; set; } // Null for essay (manual grading needed)
        public int? CorrectOptionId { get; set; } // Only shown if quiz completed
        public string? CorrectOptionText { get; set; } // Only shown if quiz completed
    }
}
