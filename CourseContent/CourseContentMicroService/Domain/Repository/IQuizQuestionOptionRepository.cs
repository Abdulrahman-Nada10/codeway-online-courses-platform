using CourseContentMicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.Repository
{
    public interface IQuizQuestionOptionRepository : IGenericRepository<QuizQuestionOptions, int>
    {
        Task<IEnumerable<QuizQuestionOptions>> GetOptionsByQuestionIdAsync(int questionId);
        Task<QuizQuestionOptions?> GetCorrectOptionAsync(int questionId);
        Task<IEnumerable<QuizQuestionOptions>> GetCorrectOptionsByQuestionIdAsync(int questionId);
    }
}
