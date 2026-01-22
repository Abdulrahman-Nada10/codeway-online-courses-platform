using CourseContentMicroService.MicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.Entities
{
    public class QuizQuestionOptions:BaseEntity<int>
    {
        public string OptionText { get; set; }
        public bool IsCorrect { get; set; } // 

        // Nav property
        public QuizQuestions QuizQuestions { get; set; }
        public int QuestionId { get; set; }
        
        //students who selected this option
        public ICollection<StudentQuizAnswers> StudentAnswers { get; set; } = new List<StudentQuizAnswers>();
    }
}
