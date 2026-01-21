using CourseContentMicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.Repository
{
    public interface IQuizRepository:IGenericRepository<Quiz,int>
    {
        Task<IEnumerable<Quiz>> GetQuizzesByLessonIdAsync(int lessonId);
        Task<Quiz?> GetQuizWithQuestionsAsync(int quizId);
        Task<Quiz?> GetQuizWithQuestionsAndOptionsAsync(int quizId);
        Task<Quiz?> GetQuizWithLessonAsync(int quizId);
    }
}
