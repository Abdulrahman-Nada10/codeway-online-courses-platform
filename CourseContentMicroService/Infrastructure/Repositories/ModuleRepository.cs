using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace CourseContentMicroService.Infrastructure.Repositories
{
    public class ModuleRepository(ApplicationDbContext context ) :  GenericRepository<Module, int>(context),IModuleRepository 
    {
        public async  Task<IEnumerable<Module>> GetModulesByCourseIdAsync(Guid courseId)
        {


            var result = await context.Modules.Where(m => m.CourseId == courseId).OrderBy(m => m.Order).ToListAsync();

            return  result;
        }

        public async Task<IEnumerable<Module>> GetModulesWithLessonsByCourseIdAsync(Guid courseId)
        {
            var result = await context.Modules
                 .Include(m => m.Lessons.OrderBy(l=>l.Order))
                 .Where(m => m.CourseId == courseId)
                 .OrderBy(m => m.Order)
                 .ToListAsync();

            return result;
        }

        public async Task<Module?> GetModuleWithLessonsAsync(int moduleId)
        {
            var result = await context.Modules
                 .Include(m => m.Lessons)
                 .OrderBy(m => m.Order)
                 .FirstOrDefaultAsync(m => m.Id == moduleId);
                 

            return result;
        }

       
    }
}
