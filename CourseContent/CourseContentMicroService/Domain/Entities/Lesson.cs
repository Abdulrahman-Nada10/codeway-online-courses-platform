using CourseContentMicroService.Domain.Entities.Enums;
using CourseContentMicroService.MicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.Entities
{
    public class Lesson:BaseEntity<int>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public LessonType LessonType { get; set; }
        public int Duration { get; set; }
        public int Order { get; set; }

        // 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Property
        public virtual Module Module { get; set; }
        public int ModuleId { get; set; }

        public virtual ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();
    }
}
