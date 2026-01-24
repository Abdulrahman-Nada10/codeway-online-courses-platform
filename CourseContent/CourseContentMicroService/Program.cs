
using AutoMapper;
using CourseContentMicroService.Application.Interfaces;
using CourseContentMicroService.Application.Mapping.AutoMapperProfiles;
using CourseContentMicroService.Application.Servicies;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Domain.UnitOfWork;
using CourseContentMicroService.Infrastructure.Contexts;
using CourseContentMicroService.Infrastructure.Repositories;
using CourseMangment.MicroService.Infrastructure.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace CourseContentMicroService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);



            // Add DbContext
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            // Add services to the container.



            // Add AutoMapper
            builder.Services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

            builder.Services.AddScoped<IUOW, UnitOfWork>();

            // Register Repositories
            builder.Services.AddScoped<IModuleRepository, ModuleRepository>();
            builder.Services.AddScoped<ILessonRepository, LessonRepository>();
            builder.Services.AddScoped<IQuizRepository, QuizRepository>();
            builder.Services.AddScoped<IQuizQuestionRepository, QuizQuestionRepository>();
            builder.Services.AddScoped<IQuizQuestionOptionRepository, QuizQuestionOptionRepository>();
            builder.Services.AddScoped<IStudentQuizSubmissionRepository, StudentQuizSubmissionRepository>();
            builder.Services.AddScoped<IStudentQuizAnswerRepository, StudentQuizAnswerRepository>();

            // Register Services
            builder.Services.AddScoped<IModuleService, ModuleService>();
            builder.Services.AddScoped<ILessonService, LessonService>();
            builder.Services.AddScoped<IQuizService, QuizService>();
            builder.Services.AddScoped<IQuizQuestionService, QuizQuestionService>();
            builder.Services.AddScoped<IQuizQuestionOptionService, QuizQuestionOptionService>();
            builder.Services.AddScoped<IStudentQuizService, StudentQuizService>();



            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
