using CourseContentMicroService.Application.DTO_s.OptionsDTO_s;
using CourseContentMicroService.Application.DTO_s.QuizQuestionsDTO_s;

namespace CourseContentMicroService.Application.Interfaces
{
    public interface IQuizQuestionService
    {
        // CRUD Operations
        Task<QuizQuestionDto?> GetByIdAsync(int id);
        Task<IEnumerable<QuizQuestionDto>> GetAllAsync();
        Task<QuizQuestionDto> CreateAsync(CreateQuizQuestionDto dto);
        Task<QuizQuestionDto?> UpdateAsync(int id, UpdateQuizQuestionDto dto);
        Task<bool> DeleteAsync(int id);

        // Custom Operations
        Task<IEnumerable<QuizQuestionDto>> GetQuestionsByQuizAsync(int quizId);
        Task<QuizQuestionWithOptionsDto?> GetQuestionWithOptionsAsync(int questionId); //same as the other interface of ILessonService
        Task<IEnumerable<QuizQuestionWithOptionsDto>> GetQuestionsWithOptionsByQuizAsync(int quizId);
        Task<QuizQuestionDto> AddQuestionToQuizAsync(CreateQuizQuestionDto dto);
        Task<bool> AddOptionsToQuestionAsync(int questionId, IEnumerable<CreateQuizQuestionOptionDto> options);
        Task<bool> ValidateQuestionOptionsAsync(int questionId);
    }
}
