using AutoMapper;
using CourseContentMicroService.Application.DTO_s.QuizDTO_s;
using CourseContentMicroService.Application.Interfaces;
using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Domain.UnitOfWork;

namespace CourseContentMicroService.Application.Servicies
{
    public class QuizService(IUOW _unitOfWork, IMapper _mapper, IQuizRepository repo ,IStudentQuizSubmissionRepository SubRepo) : IQuizService
    {

        public async Task<QuizDto?> GetByIdAsync(int id)
        {
            var quiz = await repo.GetByIdAsync(id);
            return quiz == null ? null : _mapper.Map<QuizDto>(quiz);
        }

        public async Task<IEnumerable<QuizDto>> GetAllAsync()
        {
            var quizzes = await repo.GetAllAsync();
            return _mapper.Map<IEnumerable<QuizDto>>(quizzes);
        }
        public async Task<QuizDto> CreateAsync(CreateQuizDto dto)
        {
            var quiz = _mapper.Map<Quiz>(dto);

            await repo.CreateAsync(quiz);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<QuizDto>(quiz);
        }

        public async Task<QuizDto?> UpdateAsync(int id, UpdateQuizDto dto)
        {
            var quiz = await repo.GetByIdAsync(id);
            if (quiz == null)
                return null;

            quiz.Title = dto.Title;
            quiz.Description = dto.Description;
            quiz.TotalMarks = dto.TotalMarks;
            quiz.TimeLimitMinutes = dto.TimeLimitMinutes;
            quiz.UpdatedAt = DateTime.UtcNow;

            repo.update(quiz);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<QuizDto>(quiz);
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var quiz = await repo.GetByIdAsync(id);
            if (quiz == null)
                return false;

            repo.delete(quiz);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }



        public async Task<QuizSummaryDto?> GetQuizSummaryForStudentAsync(int quizId, Guid studentId)
        {
            var quiz = await repo.GetQuizWithQuestionsAsync(quizId);
            if (quiz == null)
                return null;

            var dto = _mapper.Map<QuizSummaryDto>(quiz);

            // Check if student has completed this quiz
            var submission = await SubRepo.GetSubmissionByQuizAndStudentAsync(quizId, studentId);
            if (submission != null)
            {
                dto.IsCompleted = submission.Completed;
                dto.StudentScore = submission.Completed ? submission.TotalScore : null;
            }
            else
            {
                dto.IsCompleted = false;
                dto.StudentScore = null;
            }

            return dto;
        }

        public async Task<QuizWithQuestionsDto?> GetQuizWithQuestionsAndOptionsAsync(int quizId)
        {
            var quiz = await repo.GetQuizWithQuestionsAndOptionsAsync(quizId);
            return quiz == null ? null : _mapper.Map<QuizWithQuestionsDto>(quiz);
        }

        public async Task<QuizWithQuestionsDto?> GetQuizWithQuestionsAsync(int quizId)
        {
            var quiz = await repo.GetQuizWithQuestionsAsync(quizId);
            return quiz == null ? null : _mapper.Map<QuizWithQuestionsDto>(quiz);
        }

        public async Task<IEnumerable<QuizDto>> GetQuizzesByLessonAsync(int lessonId)
        {
            var quizzes = await repo.GetQuizzesByLessonIdAsync(lessonId);
            return _mapper.Map<IEnumerable<QuizDto>>(quizzes);
        }


    }
}
