using CourseContentMicroService.Application.DTO_s.QuizDTO_s;
using CourseContentMicroService.Domain.Entities.Enums;

namespace CourseContentMicroService.Application.DTO_s.LessonsDTO_s
{
    public class LessonDetailDto
    {
        public int Id { get; set; }
        public int ModuleId { get; set; }
        public string ModuleName { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public LessonType LessonType { get; set; }
        public string LessonTypeName { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int Order { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public IEnumerable<QuizDto> Quizzes { get; set; } = new List<QuizDto>();
    }
}
