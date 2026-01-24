using AutoMapper;
using CourseContentMicroService.Application.DTO_s.LessonsDTO_s;
using CourseContentMicroService.Application.DTO_s.Module_DTO_s;
using CourseContentMicroService.Application.DTO_s.QuizDTO_s;
using CourseContentMicroService.Application.Interfaces;
using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Entities.Enums;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Domain.UnitOfWork;

namespace CourseContentMicroService.Application.Servicies
{
    public class LessonService(IUOW _unitOfWork, IMapper _mapper, ILessonRepository repo) : ILessonService
    {


        public async Task<IEnumerable<LessonDto>> GetAllAsync()
        {
            var lessons = await repo.GetAllAsync();
            var mappedLessons = _mapper.Map<IEnumerable<LessonDto>>(lessons);
            return mappedLessons == null ? null : mappedLessons;
        }

        public async Task<LessonDto?> GetByIdAsync(int id)
        {
            var lesson = await repo.GetByIdAsync(id);
            var mappedLesson = _mapper.Map<LessonDto>(lesson);
            return mappedLesson == null ? null : mappedLesson;
        }

        public async Task<LessonDto> CreateAsync(CreateLessonDto dto)
        {

            if (!await ValidateLessonContentAsync(dto.LessonType, dto.Content))
                throw new ArgumentException("Invalid content format for lesson type");

            var lesson = _mapper.Map<Lesson>(dto);

            await repo.CreateAsync(lesson);

            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<LessonDto>(lesson);

        }
        public async Task<LessonDto?> UpdateAsync(int id, UpdateLessonDto dto)
        {
            var lesson = await repo.GetByIdAsync(id);

            if (lesson == null) return null;


            if (!await ValidateLessonContentAsync(dto.LessonType, dto.Content))
                throw new ArgumentException("Invalid content format for lesson type");

            lesson.Title = dto.Title;
            lesson.LessonType = dto.LessonType;
            lesson.Content = dto.Content;
            lesson.Duration = dto.Duration;
            lesson.Order = dto.Order;
            lesson.UpdatedAt = DateTime.UtcNow;

            repo.update(lesson);

            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<LessonDto>(lesson);
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var lesson = await repo.GetByIdAsync(id);
            if (lesson == null)
                return false;

            repo.delete(lesson);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }



        public async Task<IEnumerable<LessonDto>> GetLessonsByModuleAsync(int moduleId)
        {
            var lessons = await repo.GetLessonsByModuleIdAsync(moduleId);
            return _mapper.Map<IEnumerable<LessonDto>>(lessons);
        }

        public async Task<IEnumerable<LessonDto>> GetLessonsByTypeAsync(LessonType lessonType)
        {
            var lessons = await repo.GetLessonsByTypeAsync(lessonType);
            return _mapper.Map<IEnumerable<LessonDto>>(lessons);
        }

        public async Task<LessonDetailDto?> GetLessonWithQuizzesAsync(int lessonId)
        {
            var LessonDetails = await repo.GetLessonWithQuizzesAsync(lessonId);
            if (LessonDetails == null)
                return null;

            // Need to load module separately for ModuleName cuz teh dto does not have it  
            var lessonWithModule = await repo.GetLessonWithModuleAsync(lessonId);

            var dto = _mapper.Map<LessonDetailDto>(lessonWithModule);
            dto.Quizzes = _mapper.Map<IEnumerable<QuizDto>>(LessonDetails.Quizzes);

            return dto;

        }

        public async Task<bool> ReorderLessonsAsync(int moduleId, Dictionary<int, int> lessonOrderMap)
        {
            var lessons = await repo.GetLessonsByModuleIdAsync(moduleId);

            foreach (var lesson in lessons)
            {
                if (lessonOrderMap.ContainsKey(lesson.Id))
                {
                    lesson.Order = lessonOrderMap[lesson.Id];
                    lesson.UpdatedAt = DateTime.UtcNow;
                    repo.update(lesson);
                }
            }

            await _unitOfWork.SaveChangesAsync();
            return true;
        }


        public async Task<bool> ValidateLessonContentAsync(LessonType lessonType, string content)
        {
            if (string.IsNullOrWhiteSpace(content))
                return false;

            switch (lessonType)
            {
                case LessonType.video:
                case LessonType.PDF:
                    // Validate URL format
                    return Uri.TryCreate(content, UriKind.Absolute, out var uri)
                        && (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps);

                case LessonType.Text:
                    // Validate text length
                    return content.Length <= 10000; // Max 10k characters

                default:
                    return false;
            }
        }
    }
}

