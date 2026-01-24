using CourseContentMicroService.Application.DTO_s.AnswersDTO_s;
using CourseContentMicroService.Application.DTO_s.SubmissionDTO_s;

namespace CourseContentMicroService.Application.Interfaces
{
    public interface IStudentQuizService //the most important service 
    {
        // Quiz Attempt Management
        Task<QuizSubmissionDto> StartQuizAsync(StartQuizDto dto);
        Task<QuizSubmissionDto?> GetActiveSubmissionAsync(int quizId, Guid studentId);
        Task<IEnumerable<QuizSubmissionDto>> GetSubmissionsByStudentAsync(Guid studentId);
        Task<IEnumerable<QuizSubmissionDto>> GetIncompleteSubmissionsAsync(Guid studentId);

        // Answer Submission
        Task<QuizAnswerDto> SubmitAnswerAsync(SubmitAnswerDto dto);
        Task<bool> UpdateAnswerAsync(int answerId, SubmitAnswerDto dto);

        // Quiz Completion
        Task<QuizSubmissionDetailDto?> CompleteQuizAsync(int submissionId);
        Task<QuizSubmissionDetailDto?> GetSubmissionDetailsAsync(int submissionId); //after submiting the quiz 

        // Grading
        Task<decimal> AutoGradeMCQAsync(int answerId);
        Task<decimal> AutoGradeSubmissionAsync(int submissionId);
        Task<bool> ManualGradeAnswerAsync(GradeAnswerDto dto); //for the essay ones 
    }
}
