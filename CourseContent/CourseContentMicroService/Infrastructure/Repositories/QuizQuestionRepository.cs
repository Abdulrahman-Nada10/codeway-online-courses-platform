using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace CourseContentMicroService.Infrastructure.Repositories
{
    public class QuizQuestionRepository(ApplicationDbContext context) : GenericRepository<QuizQuestions, int>(context), IQuizQuestionRepository
    {
        public async Task<IEnumerable<QuizQuestions>> GetQuestionsByQuizIdAsync(int quizId)
        {
            var result = await context.QuizQuestions.Where(qq => qq.QuizId == quizId).ToListAsync();
            return result;
        }

        public async Task<IEnumerable<QuizQuestions>> GetQuestionsWithOptionsByQuizIdAsync(int quizId)
        {
            var result = await context.QuizQuestions.Include(qq => qq.Options)
                .Where(qq => qq.QuizId == quizId)
                .OrderBy(qq => qq.Order)
                .ToListAsync();
            return result;
        }

        public async Task<QuizQuestions?> GetQuestionWithOptionsAsync(int questionId)
        {
            var result = await context.QuizQuestions
                .Include(qq => qq.Options)
                .FirstOrDefaultAsync(qq => qq.Id == questionId);
            
            return result;
        }
    }
}
