using CourseContentMicroService.Application.DTO_s.OptionsDTO_s;
using CourseContentMicroService.Domain.Entities.Enums;

namespace CourseContentMicroService.Application.DTO_s.QuizQuestionsDTO_s
{
    public class CreateQuizQuestionDto
    {
        public int QuizId { get; set; }
        public string QuestionText { get; set; } = string.Empty;
        public QuestionType QuestionType { get; set; }
        public decimal Marks { get; set; }
        public int Order { get; set; }
        public IEnumerable<CreateQuizQuestionOptionDto> Options { get; set; } = new List<CreateQuizQuestionOptionDto>();
    }
}
