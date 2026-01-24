using CourseContentMicroService.Domain.Entities.Enums;

namespace CourseContentMicroService.Application.DTO_s.QuizQuestionsDTO_s
{
    public class UpdateQuizQuestionDto
    {
        public string QuestionText { get; set; } = string.Empty;
        public QuestionType QuestionType { get; set; }
        public decimal Marks { get; set; }
        public int Order { get; set; }
    }
}
