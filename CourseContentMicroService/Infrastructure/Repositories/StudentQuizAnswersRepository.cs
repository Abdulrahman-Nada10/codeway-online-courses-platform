using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace CourseContentMicroService.Infrastructure.Repositories
{
    public class StudentQuizAnswerRepository(ApplicationDbContext context) : GenericRepository<StudentQuizAnswers, int>(context), IStudentQuizAnswerRepository
    {
      
        public async Task<IEnumerable<StudentQuizAnswers>> GetAnswersBySubmissionIdAsync(int submissionId)
        {
            return await context.StudentQuizAnswers
                .Where(a => a.SubmissionId == submissionId)
                .ToListAsync();
        }

        public async Task<StudentQuizAnswers?> GetAnswerBySubmissionAndQuestionAsync(int submissionId, int questionId)
        {
            return await context.StudentQuizAnswers
                .FirstOrDefaultAsync(a => a.SubmissionId == submissionId && a.QuestionId == questionId);
        }

        public async Task<IEnumerable<StudentQuizAnswers>> GetAnswersWithQuestionAndOptionAsync(int submissionId)
        {
            return await context.StudentQuizAnswers
                .Include(a => a.Question)
                .Include(a => a.SelectedOption)
                .Where(a => a.SubmissionId == submissionId)
                .ToListAsync();
        }
    }
}
