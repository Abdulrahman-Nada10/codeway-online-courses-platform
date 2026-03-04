namespace CourseContentMicroService.Application.DTO_s.SubmissionDTO_s
{
    public class QuizSubmissionDto
    {
        public int Id { get; set; }
        public int QuizId { get; set; }
        public Guid StudentId { get; set; }
        public DateTime? SubmittedAt { get; set; }
        public decimal TotalScore { get; set; }
        public bool Completed { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
