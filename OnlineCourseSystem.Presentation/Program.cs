using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Presentation.Domain.Repository;
using OnlineCourseSystem.Presentation.Domain.UnitOfWork;
using OnlineCourseSystem.Presentation.Infrastructure.Contexts;
using OnlineCourseSystem.Presentation.Infrastructure.Repositories;
using OnlineCourseSystem.Presentation.Infrastructure.UnitOfWork;

var builder = WebApplication.CreateBuilder(args);

// ── DB Context ──────────────────────────────────────────────────
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ── Repositories ────────────────────────────────────────────────
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IPaymentTransactionRepository, PaymentTransactionRepository>();

// ── Unit of Work ────────────────────────────────────────────────
builder.Services.AddScoped<IUOW, UnitOfWork>();

// ── AutoMapper ──────────────────────────────────────────────────
// builder.Services.AddAutoMapper(typeof(PaymentMappingProfile));

// ── JWT Auth ────────────────────────────────────────────────────
// TODO: add JWT config here when ready

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
