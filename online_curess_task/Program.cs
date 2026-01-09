

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using online_curess_task.Data;
using online_curess_task.Modle;
using online_curess_task.Repositories;
using online_curess_task.Repositories.IRepositories;
using online_curess_task.Utility;

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
            // add Identity 
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                 .AddEntityFrameworkStores<ApplicationDbContext>()
                 .AddDefaultTokenProviders();
            builder.Services.AddScoped<IScormStatmentRepository , ScormStatmentRepository>();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IDbinitialize, Dbinitialize>();
            
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            // Dbinitializer
            using (var scope = app.Services.CreateScope())
            {
                var dbInitializer = scope.ServiceProvider.GetRequiredService<IDbinitialize>();
                dbInitializer.InitializeAsync().GetAwaiter().GetResult();
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
