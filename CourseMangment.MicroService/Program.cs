
using CourseMangment.MicroService.Application.interfaces;
using CourseMangment.MicroService.Application.Servicies;
using CourseMangment.MicroService.Domain.Repository;
using CourseMangment.MicroService.Domain.UnitOfWork;
using CourseMangment.MicroService.Infrastructure.Repositories;
using CourseMangment.MicroService.Infrastructure.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace CourseMangment.MicroService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            //database Connection and Context Registration
            builder.Services.AddDbContext<Infrastructure.Contexts.ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            //hena hyb2a feh el registration of all other services elly ana 3ayzaha zay Repositories w Services etc.

            builder.Services.AddScoped<IUOW,UOW>();//UOW Registration
            
            builder.Services.AddScoped<ICourseService, CourseService>();//Specific Repository Registration
            

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
