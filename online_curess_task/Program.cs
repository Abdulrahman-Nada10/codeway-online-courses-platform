

using Microsoft.EntityFrameworkCore;
using online_curess_task.Data;
using online_curess_task.Repositories;
using online_curess_task.Repositories.IRepositories;

namespace online_curess_task
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

            builder.Services.AddDbContext<ApplicationDbContext>(
                option=>option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
           
            builder.Services.AddScoped<IScormStatmentRepository , ScormStatmentRepository>();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            
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
