
using CourseContentMicroService.MicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.Entities
{
    public class StudentQuizSubmission : BaseEntity<int>
    {
        public int QuizId { get; set; }
        public Guid StudentId { get; set; } // Foreign key to User/Student service
        public DateTime? SubmittedAt { get; set; } // Nullable - set when quiz is completed
        public decimal TotalScore { get; set; }
        public bool Completed { get; set; } // False when started, True when submitted
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // When student started

        // Navigation Properties
        public virtual Quiz Quiz { get; set; }
        public virtual ICollection<StudentQuizAnswers> Answers { get; set; } = new List<StudentQuizAnswers>();
    }
}
