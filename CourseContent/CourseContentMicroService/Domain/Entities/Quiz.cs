using CourseContentMicroService.MicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.Entities
{
    public class Quiz : BaseEntity<int>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal TotalMarks { get; set; } // 
        public int? TimeLimitMinutes { get; set; } // 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // 
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigational properties
        public virtual Lesson Lesson { get; set; }
        public int LessonId { get; set; }

        public virtual  ICollection<QuizQuestions> Questions { get; set; } = new List<QuizQuestions>();
        public virtual ICollection<StudentQuizSubmission> Submissions { get; set; } = new List<StudentQuizSubmission>();


    }
}
