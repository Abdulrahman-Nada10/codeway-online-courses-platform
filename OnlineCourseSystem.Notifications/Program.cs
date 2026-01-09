using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Models.Data;
using OnlineCourseSystem.Notifications.Services;
using OnlineCourseSystem.Notifications.Services.Repositories;
using OnlineCourseSystem.Notifications.Services.UnitOfWork;
using OnlineCourseSystem.Notifications.Validators.Notification;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// =======================
// Database
// =======================
builder.Services.AddDbContext<NotificationsDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// =======================
// Controllers
// =======================
builder.Services.AddControllers(options =>
{
    options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true;
});

// =======================
// FluentValidation
// =======================
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateNotificationValidator>();


// =======================
// Swagger + XML Comments
// =======================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

    if (File.Exists(xmlPath))
    {
        options.IncludeXmlComments(xmlPath);
    }
});

// =======================
// MediatR (CQRS)
// =======================
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(
        typeof(CreateNotificationValidator).Assembly
    );
});

builder.Services.AddTransient(
    typeof(IPipelineBehavior<,>),
    typeof(ValidationBehavior<,>)
);

// =======================
// FluentValidation
// =======================
builder.Services.AddValidatorsFromAssemblyContaining<CreateNotificationValidator>();

// =======================
// Unit of Work
// =======================
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// =======================
// Services
// =======================
builder.Services.AddScoped<INotificationService, NotificationService>();

var app = builder.Build();

// =======================
// HTTP Pipeline
// =======================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
