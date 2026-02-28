using CourseContentMicroService.Domain.Entities.Enums;

namespace CourseContentMicroService.Application.DTO_s.QuizQuestionsDTO_s
{
    public class QuizQuestionDto
    {
        public int Id { get; set; }
        public int QuizId { get; set; }
        public string QuestionText { get; set; } = string.Empty;
        public QuestionType QuestionType { get; set; }
        public string QuestionTypeName { get; set; } = string.Empty; // "MCQ", "Essay", "TrueFalse"
        public decimal Marks { get; set; }
        public int Order { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
