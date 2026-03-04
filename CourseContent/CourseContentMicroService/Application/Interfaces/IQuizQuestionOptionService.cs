using CourseContentMicroService.Application.DTO_s.OptionsDTO_s;

namespace CourseContentMicroService.Application.Interfaces
{
    public interface IQuizQuestionOptionService
    {
        // CRUD Operations
        Task<QuizQuestionOptionDto?> GetByIdAsync(int id);
        Task<IEnumerable<QuizQuestionOptionDto>> GetAllAsync();
        Task<QuizQuestionOptionDto> CreateAsync(int questionId, CreateQuizQuestionOptionDto dto);
        Task<QuizQuestionOptionDto?> UpdateAsync(int id, CreateQuizQuestionOptionDto dto);
        Task<bool> DeleteAsync(int id);

        // Custom Operations
        Task<IEnumerable<QuizQuestionOptionDto>> GetOptionsByQuestionAsync(int questionId);
        Task<QuizQuestionOptionDto?> GetCorrectOptionAsync(int questionId);
    }
}
