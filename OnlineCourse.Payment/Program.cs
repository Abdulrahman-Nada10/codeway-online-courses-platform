using Microsoft.EntityFrameworkCore;
using OnlineCourse.Payment.Core.Repository;
using OnlineCourse.Payment.Core.UnitOfWork;
using OnlineCourse.Payment.Infrastracture.Persistence;

namespace OnlineCourse.Payment
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // DbContext
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Repositories
            builder.Services.AddScoped<IOrderRepository, OrderRepository>();
            builder.Services.AddScoped<IPaymentTransactionRepository, PaymentTransactionRepository>();

            // Unit of Work
            builder.Services.AddScoped<IUOW, UnitOfWork>();

            // TODO: Register AutoMapper
            // builder.Services.AddAutoMapper(cfg => cfg.AddProfile<PaymentMappingProfile>());

            // TODO: Register Application Services
            // builder.Services.AddScoped<IOrderService, OrderService>();
            // builder.Services.AddScoped<IPaymobService, PaymobService>();

            // TODO: Add JWT Authentication
            // builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //     .AddJwtBearer(options => { ... });

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
