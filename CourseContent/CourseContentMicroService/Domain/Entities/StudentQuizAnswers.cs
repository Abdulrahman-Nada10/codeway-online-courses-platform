using CourseContentMicroService.MicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.Entities
{
    public class StudentQuizAnswers:BaseEntity<int>
    {
        public int SubmissionId { get; set; } // Foreign key
        public int QuestionId { get; set; } // Foreign key
        public int? SelectedOptionId { get; set; } // Foreign key - nullable (only for MCQ)
        public string? AnswerText { get; set; } // Nullable (only for Essay questions)
        public decimal Score { get; set; } // Score awarded for this answer

        // Navigation Properties
        public virtual StudentQuizSubmission Submission { get; set; }
        public virtual QuizQuestions Question { get; set; }
        public virtual QuizQuestionOptions? SelectedOption { get; set; } // Nullable - only for MCQ
    }
}
