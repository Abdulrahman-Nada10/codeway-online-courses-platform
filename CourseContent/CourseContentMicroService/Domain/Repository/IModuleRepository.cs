

using CourseContentMicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.Repository
{
    public interface IModuleRepository:IGenericRepository<Module,int>
    {

        Task<IEnumerable<Module>> GetModulesByCourseIdAsync(Guid courseId);
        Task<Module?> GetModuleWithLessonsAsync(int moduleId);
        Task<IEnumerable<Module>> GetModulesWithLessonsByCourseIdAsync(Guid courseId);

    }
}
