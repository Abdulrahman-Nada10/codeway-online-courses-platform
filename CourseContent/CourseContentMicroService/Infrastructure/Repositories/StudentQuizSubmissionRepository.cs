using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace CourseContentMicroService.Infrastructure.Repositories
{
    public class StudentQuizSubmissionRepository(ApplicationDbContext _context) : GenericRepository<StudentQuizSubmission, int>(_context), IStudentQuizSubmissionRepository
    {
       

        public async Task<IEnumerable<StudentQuizSubmission>> GetSubmissionsByStudentIdAsync(Guid studentId)
        {
            return await _context.studentQuizSubmissions
                .Where(s => s.StudentId == studentId)
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();
        }

        public async Task<StudentQuizSubmission?> GetSubmissionByQuizAndStudentAsync(int quizId, Guid studentId)
        {
            return await _context.studentQuizSubmissions
                .FirstOrDefaultAsync(s => s.QuizId == quizId && s.StudentId == studentId);
        }

        public async Task<IEnumerable<StudentQuizSubmission>> GetIncompleteSubmissionsByStudentAsync(Guid studentId)
        {
            return await _context.studentQuizSubmissions
                .Where(s => s.StudentId == studentId && !s.Completed)
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();
        }

        public async Task<StudentQuizSubmission?> GetSubmissionWithAnswersAsync(int submissionId)
        {
            return await _context.studentQuizSubmissions
                .Include(s => s.Answers)
                .FirstOrDefaultAsync(s => s.Id == submissionId);
        }

        public async Task<StudentQuizSubmission?> GetSubmissionWithAnswersAndDetailsAsync(int submissionId)
        {
            return await _context.studentQuizSubmissions
                .Include(s => s.Answers)
                    .ThenInclude(a => a.Question)
                .Include(s => s.Answers)
                    .ThenInclude(a => a.SelectedOption)
                .FirstOrDefaultAsync(s => s.Id == submissionId);
        }

        public async Task<IEnumerable<StudentQuizSubmission>> GetCompletedSubmissionsByStudentAsync(Guid studentId)
        {
            return await _context.studentQuizSubmissions
                .Where(s => s.StudentId == studentId && s.Completed)
                .OrderByDescending(s => s.SubmittedAt)
                .ToListAsync();
        }
    }
}
