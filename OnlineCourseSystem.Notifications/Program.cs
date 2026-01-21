using FirebaseAdmin;
using FluentValidation;
using FluentValidation.AspNetCore;
using Google.Apis.Auth.OAuth2;
using MassTransit;
using MediatR;
using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork;
using OnlineCourseSystem.Notifications.Infrastructure.Services;
using OnlineCourseSystem.Notifications.Infrastructure.Services.Interfaces;
using OnlineCourseSystem.Notifications.Models.Data;
using OnlineCourseSystem.Notifications.Services.Repositories;
using OnlineCourseSystem.Notifications.Services.Repositories.Interfaces;
using OnlineCourseSystem.Notifications.Validators.Notification;
using OnlineCourseSystem.Notifications.Workers;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// =======================
// Database
// =======================
builder.Services.AddDbContext<NotificationsDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromFile(
        builder.Configuration["Firebase:CredentialsPath"])
});

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
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IPushNotificationService, PushNotificationService>();

// =======================
// Messaging (MassTransit + RabbitMQ)
// =======================
builder.Services.AddMassTransit(x =>
{
    x.SetKebabCaseEndpointNameFormatter();

    // Consumers are registered in the Application layer (will be added shortly).
    x.AddConsumers(typeof(Program).Assembly);

    x.UsingRabbitMq((context, cfg) =>
    {
        var rabbitMqSection = builder.Configuration.GetSection("RabbitMq");
        var host = rabbitMqSection.GetValue<string>("Host") ?? "localhost";
        var virtualHost = rabbitMqSection.GetValue<string>("VirtualHost") ?? "/";
        var username = rabbitMqSection.GetValue<string>("Username") ?? "guest";
        var password = rabbitMqSection.GetValue<string>("Password") ?? "guest";

        cfg.Host(host, virtualHost, h =>
        {
            h.Username(username);
            h.Password(password);
        });

        // Default retry & circuit breaker for all consumers.
        cfg.UseMessageRetry(r =>
        {
            r.Exponential(
                retryLimit: 5,
                minInterval: TimeSpan.FromSeconds(1),
                maxInterval: TimeSpan.FromSeconds(30),
                intervalDelta: TimeSpan.FromSeconds(2));
        });

        // Global receive endpoint configuration
        cfg.ConfigureEndpoints(context);

    });
});

// =======================
// Background Workers
// =======================
builder.Services.AddHostedService<EmailOutboxWorker>();
builder.Services.AddHostedService<PushOutboxWorker>();
builder.Services.AddHostedService<ScheduledNotificationWorker>();




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
