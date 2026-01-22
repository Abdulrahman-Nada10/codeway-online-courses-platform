using CourseContentMicroService.Domain.Entities.Enums;

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
        public Quiz Quiz { get; set; }
        public int QuizId { get; set; }

       
        public ICollection<QuizQuestionOptions> Options { get; set; } = new List<QuizQuestionOptions>();
        public ICollection<StudentQuizAnswers> StudentAnswers { get; set; } = new List<StudentQuizAnswers>();
    }
}

