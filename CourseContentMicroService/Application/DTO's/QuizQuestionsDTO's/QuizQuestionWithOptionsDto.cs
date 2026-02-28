using CourseContentMicroService.Application.DTO_s.OptionsDTO_s;
using CourseContentMicroService.Domain.Entities.Enums;

namespace CourseContentMicroService.Application.DTO_s.QuizQuestionsDTO_s
{
    public class QuizQuestionWithOptionsDto
    {
        public int Id { get; set; }
        public int QuizId { get; set; }
        public string QuestionText { get; set; } = string.Empty;
        public QuestionType QuestionType { get; set; }
        public string QuestionTypeName { get; set; } = string.Empty;
        public decimal Marks { get; set; }
        public int Order { get; set; }
        public DateTime CreatedAt { get; set; }
        public IEnumerable<QuizQuestionOptionDto> Options { get; set; } = new List<QuizQuestionOptionDto>();
    }
}
