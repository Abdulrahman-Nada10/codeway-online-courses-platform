using CourseContentMicroService.MicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.Entities
{
    public class QuizQuestionOptions:BaseEntity<int>
    {
        public string OptionText { get; set; }
        public bool IsCorrect { get; set; } // 

        // Nav property
        public virtual QuizQuestions QuizQuestions { get; set; }
        public int QuestionId { get; set; }
        
        //students who selected this option
        public virtual ICollection<StudentQuizAnswers> StudentAnswers { get; set; } = new List<StudentQuizAnswers>();
    }
}
