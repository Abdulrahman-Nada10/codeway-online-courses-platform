using CourseContentMicroService.Application.DTO_s.QuizDTO_s;

namespace CourseContentMicroService.Application.Interfaces
{
    public interface IQuizService
    {
        // CRUD Operations
        Task<QuizDto?> GetByIdAsync(int id);
        Task<IEnumerable<QuizDto>> GetAllAsync();
        Task<QuizDto> CreateAsync(CreateQuizDto dto);
        Task<QuizDto?> UpdateAsync(int id, UpdateQuizDto dto);
        Task<bool> DeleteAsync(int id);

        // Custom Operations
        Task<IEnumerable<QuizDto>> GetQuizzesByLessonAsync(int lessonId);
        Task<QuizWithQuestionsDto?> GetQuizWithQuestionsAsync(int quizId);
        Task<QuizWithQuestionsDto?> GetQuizWithQuestionsAndOptionsAsync(int quizId); //ahem wahed 
        Task<QuizSummaryDto?> GetQuizSummaryForStudentAsync(int quizId, Guid studentId); //tany ahem wahed 3shan lma y5ls yshof el natiga 
    }
}
