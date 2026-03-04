using AutoMapper;
using CourseContentMicroService.Application.DTO_s.OptionsDTO_s;
using CourseContentMicroService.Application.DTO_s.QuizQuestionsDTO_s;
using CourseContentMicroService.Application.Interfaces;
using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Entities.Enums;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Domain.UnitOfWork;

namespace CourseContentMicroService.Application.Servicies
{
    public class QuizQuestionService(IUOW _unitOfWork, IMapper _mapper, IQuizQuestionRepository repo , IQuizQuestionOptionRepository opRepo) : IQuizQuestionService
    {

        public async Task<QuizQuestionDto?> GetByIdAsync(int id)
        {
            var question = await repo.GetByIdAsync(id);
            return question == null ? null : _mapper.Map<QuizQuestionDto>(question);
        }

        public async Task<IEnumerable<QuizQuestionDto>> GetAllAsync()
        {
            var questions = await repo.GetAllAsync();
            return _mapper.Map<IEnumerable<QuizQuestionDto>>(questions);
        }
        public async Task<QuizQuestionDto> CreateAsync(CreateQuizQuestionDto dto)
        {
            var question = _mapper.Map<QuizQuestions>(dto);

            await repo.CreateAsync(question);
            await _unitOfWork.SaveChangesAsync();

            // Add options if provided
            if (dto.Options != null && dto.Options.Any())
            {
                await AddOptionsToQuestionAsync(question.Id, dto.Options);
            }

            return _mapper.Map<QuizQuestionDto>(question);
        }

        public async Task<QuizQuestionDto?> UpdateAsync(int id, UpdateQuizQuestionDto dto)
        {
            var question = await repo.GetByIdAsync(id);
            if (question == null)
                return null;

            question.QuestionText = dto.QuestionText;
            question.QuestionType = dto.QuestionType;
            question.Marks = dto.Marks;
            question.Order = dto.Order;

            repo.update(question);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<QuizQuestionDto>(question);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var question = await repo.GetByIdAsync(id);
            if (question == null)
                return false;

            repo.delete(question);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }



        //custom 
        public async Task<bool> AddOptionsToQuestionAsync(int questionId, IEnumerable<CreateQuizQuestionOptionDto> options)
        {
            var question = await repo.GetByIdAsync(questionId);
            if (question == null)
                return false;

            foreach (var optionDto in options)
            {
                var option = _mapper.Map<QuizQuestionOptions>(optionDto);
                option.QuestionId = questionId;
                await opRepo.CreateAsync(option);
            }

            await _unitOfWork.SaveChangesAsync();

            // Validate after adding
            return await ValidateQuestionOptionsAsync(questionId);
        }

        public async Task<QuizQuestionDto> AddQuestionToQuizAsync(CreateQuizQuestionDto dto)
        => await CreateAsync(dto);






        public async Task<IEnumerable<QuizQuestionDto>> GetQuestionsByQuizAsync(int quizId)
        {
            var questions = await repo.GetQuestionsByQuizIdAsync(quizId);
            return _mapper.Map<IEnumerable<QuizQuestionDto>>(questions);
        }

        public async Task<IEnumerable<QuizQuestionWithOptionsDto>> GetQuestionsWithOptionsByQuizAsync(int quizId)
        {
            var questions = await repo.GetQuestionsWithOptionsByQuizIdAsync(quizId);
            return _mapper.Map<IEnumerable<QuizQuestionWithOptionsDto>>(questions);
        }

        public async Task<QuizQuestionWithOptionsDto?> GetQuestionWithOptionsAsync(int questionId)
        {
            var question = await repo.GetQuestionWithOptionsAsync(questionId);
            return question == null ? null : _mapper.Map<QuizQuestionWithOptionsDto>(question);
        }



        public async Task<bool> ValidateQuestionOptionsAsync(int questionId)
        {
            var question = await repo.GetQuestionWithOptionsAsync(questionId);
            if (question == null)
                return false;

            // For MCQ and TrueFalse, must have options
            if (question.QuestionType == QuestionType.MCQ || question.QuestionType == QuestionType.TrueFalse)
            {
                if (!question.Options.Any())
                    return false;

                // Must have at least one correct answer
                if (!question.Options.Any(o => o.IsCorrect))
                    return false;

                // For TrueFalse, must have exactly 2 options
                if (question.QuestionType == QuestionType.TrueFalse && question.Options.Count() != 2)
                    return false;
            }

            return true;
        }
    }
}
