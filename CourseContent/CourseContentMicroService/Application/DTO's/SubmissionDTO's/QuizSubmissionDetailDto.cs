using CourseContentMicroService.Application.DTO_s.AnswersDTO_s;

namespace CourseContentMicroService.Application.DTO_s.SubmissionDTO_s
{
    public class QuizSubmissionDetailDto
    {
        public int Id { get; set; }
        public int QuizId { get; set; }
        public string QuizTitle { get; set; } = string.Empty;
        public Guid StudentId { get; set; }
        public DateTime? SubmittedAt { get; set; }
        public decimal TotalScore { get; set; }
        public decimal MaxScore { get; set; }
        public bool Completed { get; set; }
        public DateTime CreatedAt { get; set; }
        public IEnumerable<QuizAnswerDto> Answers { get; set; } = new List<QuizAnswerDto>();
    }
}
