using AutoMapper;
using CourseContentMicroService.Application.DTO_s.OptionsDTO_s;
using CourseContentMicroService.Application.Interfaces;
using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Domain.UnitOfWork;

namespace CourseContentMicroService.Application.Servicies
{
    public class QuizQuestionOptionService(IUOW _unitOfWork, IMapper _mapper, IQuizQuestionOptionRepository repo) : IQuizQuestionOptionService
    {

        public async Task<QuizQuestionOptionDto?> GetByIdAsync(int id)
        {
            var option = await repo.GetByIdAsync(id);
            return option == null ? null : _mapper.Map<QuizQuestionOptionDto>(option);
        }

        public async Task<IEnumerable<QuizQuestionOptionDto>> GetAllAsync()
        {
            var options = await repo.GetAllAsync();
            return _mapper.Map<IEnumerable<QuizQuestionOptionDto>>(options);
        }

        public async Task<QuizQuestionOptionDto> CreateAsync(int questionId, CreateQuizQuestionOptionDto dto)
        {
            var option = _mapper.Map<QuizQuestionOptions>(dto);
            option.QuestionId = questionId;

            await repo.CreateAsync(option);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<QuizQuestionOptionDto>(option);
        }

        public async Task<QuizQuestionOptionDto?> UpdateAsync(int id, CreateQuizQuestionOptionDto dto)
        {
            var option = await repo.GetByIdAsync(id);
            if (option == null)
                return null;

            option.OptionText = dto.OptionText;
            option.IsCorrect = dto.IsCorrect;

            repo.update(option);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<QuizQuestionOptionDto>(option);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var option = await repo.GetByIdAsync(id);
            if (option == null)
                return false;

            repo.delete(option);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }





        public async Task<QuizQuestionOptionDto?> GetCorrectOptionAsync(int questionId)
        {
            var option = await repo.GetCorrectOptionAsync(questionId);
            return option == null ? null : _mapper.Map<QuizQuestionOptionDto>(option);
        }
        public async Task<IEnumerable<QuizQuestionOptionDto>> GetOptionsByQuestionAsync(int questionId)
        {
            var options = await repo.GetOptionsByQuestionIdAsync(questionId);
            return _mapper.Map<IEnumerable<QuizQuestionOptionDto>>(options);
        }


    }
}
