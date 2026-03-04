using CourseContentMicroService.Application.DTO_s.Module_DTO_s;

namespace CourseContentMicroService.Application.Interfaces
{
    public interface IModuleService
    {
        // CRUD Operations
        Task<ModuleDto?> GetByIdAsync(int id);
        Task<IEnumerable<ModuleDto>> GetAllAsync();
        Task<ModuleDto> CreateAsync(CreateModuleDto dto);
        Task<ModuleDto?> UpdateAsync(int id, UpdateModuleDto dto);
        Task<bool> DeleteAsync(int id);

        // Custom Operations
        Task<IEnumerable<ModuleDto>> GetModulesByCourseAsync(Guid courseId);
        Task<ModuleWithLessonsDto?> GetModuleWithLessonsAsync(int moduleId);
        Task<IEnumerable<ModuleWithLessonsDto>> GetModulesWithLessonsByCourseAsync(Guid courseId);
        Task<bool> ReorderModulesAsync(Guid courseId, Dictionary<int, int> moduleOrderMap);
    }
}
