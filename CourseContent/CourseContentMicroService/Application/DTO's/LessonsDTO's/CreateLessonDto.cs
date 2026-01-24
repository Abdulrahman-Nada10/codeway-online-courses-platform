using CourseContentMicroService.Domain.Entities.Enums;

namespace CourseContentMicroService.Application.DTO_s.LessonsDTO_s
{
    public class CreateLessonDto
    {
        public int ModuleId { get; set; }
        public string Title { get; set; } = string.Empty;
        public LessonType LessonType { get; set; }
        public string Content { get; set; } = string.Empty; // URL or text content
        public int Duration { get; set; } // In minutes
        public int Order { get; set; }
    }
}
