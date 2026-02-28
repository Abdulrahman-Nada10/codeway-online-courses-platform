using CourseContentMicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.Repository
{
    public interface IQuizQuestionRepository : IGenericRepository<QuizQuestions, int>
    {
        Task<IEnumerable<QuizQuestions>> GetQuestionsByQuizIdAsync(int quizId);
        Task<QuizQuestions?> GetQuestionWithOptionsAsync(int questionId);
        Task<IEnumerable<QuizQuestions>> GetQuestionsWithOptionsByQuizIdAsync(int quizId);
    }
}
