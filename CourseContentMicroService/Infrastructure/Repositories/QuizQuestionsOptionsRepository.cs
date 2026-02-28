using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace CourseContentMicroService.Infrastructure.Repositories
{
    public class QuizQuestionsOptionsRepository(ApplicationDbContext context) : GenericRepository<QuizQuestionOptions, int>(context), IQuizQuestionOptionRepository
    {
        public Task<QuizQuestionOptions?> GetCorrectOptionAsync(int questionId)
        {
            var result = context.QuizQuestionsOptions
                .Where(qqo => qqo.IsCorrect == true)
                .FirstOrDefaultAsync(qqo => qqo.QuestionId == questionId);
            return result;
        }

        public async Task<IEnumerable<QuizQuestionOptions>> GetCorrectOptionsByQuestionIdAsync(int questionId)
        {
            var result = await context.QuizQuestionsOptions
                .Where(o => o.QuestionId == questionId && o.IsCorrect)
                .ToListAsync();
            return result;
        }

        public async Task<IEnumerable<QuizQuestionOptions>> GetOptionsByQuestionIdAsync(int questionId)
        {
            var result = await context.QuizQuestionsOptions.Where(o => o.QuestionId == questionId)
                .ToListAsync();
            return result;
        }
    }
}
