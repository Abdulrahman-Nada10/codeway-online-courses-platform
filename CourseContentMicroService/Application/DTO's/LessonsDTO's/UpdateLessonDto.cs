using CourseContentMicroService.Domain.Entities.Enums;

namespace CourseContentMicroService.Application.DTO_s.LessonsDTO_s
{
    public class UpdateLessonDto
    {
        public string Title { get; set; } = string.Empty;
        public LessonType LessonType { get; set; }
        public string Content { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int Order { get; set; }
    }
}
