using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace CourseContentMicroService.Infrastructure.Repositories
{
    public class QuizRepository(ApplicationDbContext context) : GenericRepository<Quiz, int>(context), IQuizRepository
    {
        public async Task<Quiz?> GetQuizWithQuestionsAndOptionsAsync(int quizId)
        {
            var result = await context.Quizzes
                .Include(x => x.Questions.OrderBy(x=>x.Order))
                .ThenInclude(x=>x.Options)
                .FirstOrDefaultAsync(q=>q.Id == quizId);

            return result;
        }

        public async Task<Quiz?> GetQuizWithLessonAsync(int quizId)
        {
            var result = await context.Quizzes
                .Include(l => l.Lesson)
                .FirstOrDefaultAsync(q => q.Id == quizId);
            return result;
        }

       

        public async  Task<Quiz?> GetQuizWithQuestionsAsync(int quizId)
        {
            var result = await context.Quizzes
               .Include(x => x.Questions.OrderBy(x => x.Order))
               .FirstOrDefaultAsync(q => q.Id == quizId);

            return result;
        }

        public async Task<IEnumerable<Quiz>> GetQuizzesByLessonIdAsync(int lessonId)
        {
            var result = await context.Quizzes.Where(q => q.Id == lessonId).ToListAsync();
            return result;
        }
    }
}
