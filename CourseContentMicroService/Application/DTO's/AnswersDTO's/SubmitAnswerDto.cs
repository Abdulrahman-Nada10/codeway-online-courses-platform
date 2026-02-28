namespace CourseContentMicroService.Application.DTO_s.AnswersDTO_s
{
    public class SubmitAnswerDto
    {
        public int SubmissionId { get; set; }
        public int QuestionId { get; set; }
        public int? SelectedOptionId { get; set; } // For MCQ/TrueFalse
        public string? AnswerText { get; set; } // For Essay
    }
}
