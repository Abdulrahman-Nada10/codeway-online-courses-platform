using Microsoft.EntityFrameworkCore;
using OnlineCourse.Payment.Application.Interfaces;
using OnlineCourse.Payment.Application.Mapping;
using OnlineCourse.Payment.Application.Services;
using OnlineCourse.Payment.Core.Repository;
using OnlineCourse.Payment.Core.UnitOfWork;
using OnlineCourse.Payment.Infrastracture.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositories
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IPaymentTransactionRepository, PaymentTransactionRepository>();

// Unit of Work
builder.Services.AddScoped<IUOW, UnitOfWork>();

// Application Services
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IPaymobService, PaymobService>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(PaymentMappingProfile));

// HttpClient for Paymob
builder.Services.AddHttpClient("Paymob", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Paymob:BaseUrl"]!);
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
