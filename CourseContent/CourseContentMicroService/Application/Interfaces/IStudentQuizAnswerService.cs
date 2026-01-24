using CourseContentMicroService.Application.DTO_s.AnswersDTO_s;

namespace CourseContentMicroService.Application.Interfaces
{
    public interface IStudentQuizAnswerService
    {
        Task<QuizAnswerDto?> GetByIdAsync(int id);
        Task<IEnumerable<QuizAnswerDto>> GetAnswersBySubmissionAsync(int submissionId);
        Task<QuizAnswerDto?> GetAnswerBySubmissionAndQuestionAsync(int submissionId, int questionId);
        Task<IEnumerable<QuizAnswerDto>> GetAnswersWithDetailsAsync(int submissionId);
    }
}
