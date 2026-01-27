using CourseContentMicroService.Domain.Entities.Enums;
using CourseContentMicroService.MicroService.Domain.Entities;


namespace CourseContentMicroService.Domain.Entities
{
    public class QuizQuestions:BaseEntity<int>
    {
        public string QuestionText { get; set; }
        public QuestionType QuestionType { get; set; }
        public decimal Marks { get; set; } 
        public int Order { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigational Properties
        public virtual Quiz Quiz { get; set; }
        public int QuizId { get; set; }

       
        public virtual ICollection<QuizQuestionOptions> Options { get; set; } = new List<QuizQuestionOptions>();
        public virtual ICollection<StudentQuizAnswers> StudentAnswers { get; set; } = new List<StudentQuizAnswers>();
    }
}

