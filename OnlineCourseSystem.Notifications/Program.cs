using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Filters;
using OnlineCourseSystem.Notifications.Middlewares;
using OnlineCourseSystem.Notifications.Models.Data;
using OnlineCourseSystem.Notifications.Services;
using OnlineCourseSystem.Notifications.Services.Repositories;
using OnlineCourseSystem.Notifications.Validators;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// =======================
// Database
// =======================
builder.Services.AddDbContext<NotificationsDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// =======================
// Controllers + Filters
// =======================
builder.Services.AddControllers(options =>
{
    options.Filters.Add<ValidationFilter>();
    options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true;
});

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
// Services
// =======================
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IPreferenceService, PreferenceService>();

// =======================
// Repositories
// =======================
builder.Services.AddScoped<INotificationPreferenceRepository, NotificationPreferenceRepository>();
builder.Services.AddScoped<IUserReferenceRepository, UserReferenceRepository>();

// =======================
// FluentValidation
// =======================
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateNotificationValidator>();

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
