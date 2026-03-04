namespace CourseContentMicroService.Application.DTO_s.OptionsDTO_s
{
    public class QuizQuestionOptionDto
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string OptionText { get; set; } = string.Empty;
        public bool? IsCorrect { get; set; } // Nullable - hide correct answer until quiz completed
    }
}
