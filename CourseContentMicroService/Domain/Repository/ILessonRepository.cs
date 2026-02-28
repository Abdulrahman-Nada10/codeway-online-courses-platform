using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Entities.Enums;

namespace CourseContentMicroService.Domain.Repository
{
    public interface ILessonRepository:IGenericRepository<Lesson,int>
    {
        Task<IEnumerable<Lesson>> GetLessonsByModuleIdAsync(int moduleId);
        Task<IEnumerable<Lesson>> GetLessonsByTypeAsync(LessonType lessonType);
        Task<Lesson?> GetLessonWithQuizzesAsync(int lessonId);
        Task<Lesson?> GetLessonWithModuleAsync(int lessonId);
    }
}
