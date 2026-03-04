using CourseContentMicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.Repository
{
    public interface IStudentQuizAnswerRepository : IGenericRepository<StudentQuizAnswers, int>
    {
        Task<IEnumerable<StudentQuizAnswers>> GetAnswersBySubmissionIdAsync(int submissionId);
        Task<StudentQuizAnswers?> GetAnswerBySubmissionAndQuestionAsync(int submissionId, int questionId);
        Task<IEnumerable<StudentQuizAnswers>> GetAnswersWithQuestionAndOptionAsync(int submissionId);
    }
}
