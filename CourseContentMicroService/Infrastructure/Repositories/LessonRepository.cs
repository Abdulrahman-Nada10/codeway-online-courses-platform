using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Entities.Enums;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace CourseContentMicroService.Infrastructure.Repositories
{
    public class LessonRepository(ApplicationDbContext context) : GenericRepository<Lesson, int>(context), ILessonRepository
    {
        public async Task<IEnumerable<Lesson>> GetLessonsByModuleIdAsync(int moduleId)
        {
            var result = await context.Lessons
                .Where(l => l.ModuleId == moduleId)
                .OrderBy(l => l.Order)
                .ToListAsync();
            return result;
        }

        public async Task<IEnumerable<Lesson>> GetLessonsByTypeAsync(LessonType lessonType)
        {
            var result = await context.Lessons
                .Where(l=>l.LessonType==lessonType)
                .OrderBy(l => l.Order)
                .ToListAsync();
            return result;
        }

        public async Task<Lesson?> GetLessonWithModuleAsync(int lessonId)
        {
            var result = await context.Lessons.Include(m => m.Module).FirstOrDefaultAsync(l => l.Id == lessonId);
            return result;
        }

        public async Task<Lesson?> GetLessonWithQuizzesAsync(int lessonId)
        {
            var result = await context.Lessons.Include(m => m.Quizzes).FirstOrDefaultAsync(l => l.Id == lessonId);
            return result;
        }
    }
}
