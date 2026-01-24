namespace CourseContentMicroService.Application.DTO_s.OptionsDTO_s
{
    public class CreateQuizQuestionOptionDto
    {
        public string OptionText { get; set; } = string.Empty;
        public bool IsCorrect { get; set; }
    }
}
