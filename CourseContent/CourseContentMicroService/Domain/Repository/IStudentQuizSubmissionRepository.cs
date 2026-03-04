using CourseContentMicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.Repository
{
    public interface IStudentQuizSubmissionRepository : IGenericRepository<StudentQuizSubmission, int>
    {
        Task<IEnumerable<StudentQuizSubmission>> GetSubmissionsByStudentIdAsync(Guid studentId);
        Task<StudentQuizSubmission?> GetSubmissionByQuizAndStudentAsync(int quizId, Guid studentId);
        Task<IEnumerable<StudentQuizSubmission>> GetIncompleteSubmissionsByStudentAsync(Guid studentId);
        Task<StudentQuizSubmission?> GetSubmissionWithAnswersAsync(int submissionId);
        Task<StudentQuizSubmission?> GetSubmissionWithAnswersAndDetailsAsync(int submissionId);
        Task<IEnumerable<StudentQuizSubmission>> GetCompletedSubmissionsByStudentAsync(Guid studentId);
    }
}
