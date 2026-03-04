using CourseContentMicroService.Application.DTO_s.LessonsDTO_s;
using CourseContentMicroService.Domain.Entities.Enums;

namespace CourseContentMicroService.Application.Interfaces
{
    public interface ILessonService
    {
        // CRUD Operations
        Task<LessonDto?> GetByIdAsync(int id);
        Task<IEnumerable<LessonDto>> GetAllAsync();
        Task<LessonDto> CreateAsync(CreateLessonDto dto);
        Task<LessonDto?> UpdateAsync(int id, UpdateLessonDto dto);
        Task<bool> DeleteAsync(int id);

        // Custom Operations
        Task<IEnumerable<LessonDto>> GetLessonsByModuleAsync(int moduleId);
        Task<IEnumerable<LessonDto>> GetLessonsByTypeAsync(LessonType lessonType);
        Task<LessonDetailDto?> GetLessonWithQuizzesAsync(int lessonId);
        Task<bool> ReorderLessonsAsync(int moduleId, Dictionary<int, int> lessonOrderMap);
        Task<bool> ValidateLessonContentAsync(LessonType lessonType, string content);
    }
}
