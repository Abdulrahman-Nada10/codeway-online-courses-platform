using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace CourseContentMicroService.Infrastructure.Repositories
{
    public class QuizQuestionOptionRepository : GenericRepository<QuizQuestionOptions, int>, IQuizQuestionOptionRepository
    {
        private readonly ApplicationDbContext _context;

        public QuizQuestionOptionRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<QuizQuestionOptions>> GetOptionsByQuestionIdAsync(int questionId)
        {
            return await _context.QuizQuestionsOptions
                .Where(o => o.QuestionId == questionId)
                .ToListAsync();
        }

        public async Task<QuizQuestionOptions?> GetCorrectOptionAsync(int questionId)
        {
            return await _context.QuizQuestionsOptions
                .FirstOrDefaultAsync(o => o.QuestionId == questionId && o.IsCorrect);
        }

        public async Task<IEnumerable<QuizQuestionOptions>> GetCorrectOptionsByQuestionIdAsync(int questionId)
        {
            return await _context.QuizQuestionsOptions
                .Where(o => o.QuestionId == questionId && o.IsCorrect)
                .ToListAsync();
        }
    }
}
