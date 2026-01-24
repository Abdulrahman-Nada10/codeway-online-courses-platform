using AutoMapper;
using CourseContentMicroService.Application.DTO_s.AnswersDTO_s;
using CourseContentMicroService.Application.DTO_s.LessonsDTO_s;
using CourseContentMicroService.Application.DTO_s.Module_DTO_s;
using CourseContentMicroService.Application.DTO_s.OptionsDTO_s;
using CourseContentMicroService.Application.DTO_s.QuizDTO_s;
using CourseContentMicroService.Application.DTO_s.QuizQuestionsDTO_s;
using CourseContentMicroService.Application.DTO_s.SubmissionDTO_s;
using CourseContentMicroService.Domain.Entities;

namespace CourseContentMicroService.Application.Mapping.AutoMapperProfiles
{
    public class MappingProfile : Profile
    {

        public MappingProfile() {
            //module mapping 

            CreateMap<Module, ModuleDto>().ReverseMap();
            CreateMap<Module,ModuleWithLessonsDto>().ReverseMap();

            CreateMap<CreateModuleDto, Module>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => DateTime.UtcNow));


            // Lesson Mappings
            CreateMap<Lesson, LessonDto>()
                .ForMember(dest => dest.LessonTypeName, opt => opt.MapFrom(src => src.LessonType.ToString()));
            CreateMap<Lesson, LessonDetailDto>()
                .ForMember(dest => dest.LessonTypeName, opt => opt.MapFrom(src => src.LessonType.ToString()))
                .ForMember(dest => dest.ModuleName, opt => opt.MapFrom(src => src.Module.Title));
            CreateMap<CreateLessonDto, Lesson>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => DateTime.UtcNow));

            // Quiz Mappings
            CreateMap<Quiz, QuizDto>();
            CreateMap<Quiz, QuizWithQuestionsDto>();
            CreateMap<Quiz, QuizSummaryDto>()
                .ForMember(dest => dest.TotalQuestions, opt => opt.MapFrom(src => src.Questions.Count))
                .ForMember(dest => dest.IsCompleted, opt => opt.Ignore())
                .ForMember(dest => dest.StudentScore, opt => opt.Ignore());
            CreateMap<CreateQuizDto, Quiz>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => DateTime.UtcNow));

            // Question Mappings
            CreateMap<QuizQuestions, QuizQuestionDto>()
                .ForMember(dest => dest.QuestionTypeName, opt => opt.MapFrom(src => src.QuestionType.ToString()));
            CreateMap<QuizQuestions, QuizQuestionWithOptionsDto>()
                .ForMember(dest => dest.QuestionTypeName, opt => opt.MapFrom(src => src.QuestionType.ToString()));
            CreateMap<CreateQuizQuestionDto, QuizQuestions>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.Options, opt => opt.Ignore());

            // Option Mappings
            CreateMap<QuizQuestionOptions, QuizQuestionOptionDto>();
            CreateMap<CreateQuizQuestionOptionDto, QuizQuestionOptions>();

            // Submission Mappings
            CreateMap<StudentQuizSubmission, QuizSubmissionDto>();
            CreateMap<StudentQuizSubmission, QuizSubmissionDetailDto>()
                .ForMember(dest => dest.QuizTitle, opt => opt.MapFrom(src => src.Quiz.Title))
                .ForMember(dest => dest.MaxScore, opt => opt.MapFrom(src => src.Quiz.TotalMarks));

            // Answer Mappings
            CreateMap<StudentQuizAnswers, QuizAnswerDto>()
                .ForMember(dest => dest.QuestionText, opt => opt.MapFrom(src => src.Question.QuestionText))
                .ForMember(dest => dest.QuestionMarks, opt => opt.MapFrom(src => src.Question.Marks))
                .ForMember(dest => dest.SelectedOptionText, opt => opt.MapFrom(src => src.SelectedOption != null ? src.SelectedOption.OptionText : null))
                .ForMember(dest => dest.IsCorrect, opt => opt.MapFrom(src => src.SelectedOption != null ? src.SelectedOption.IsCorrect : (bool?)null))
                .ForMember(dest => dest.CorrectOptionId, opt => opt.Ignore())
                .ForMember(dest => dest.CorrectOptionText, opt => opt.Ignore());
        }
       
    }
}
