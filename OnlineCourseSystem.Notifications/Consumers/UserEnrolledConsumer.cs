using MassTransit;
using OnlineCourseSystem.Contracts.Messaging.Events;
using OnlineCourseSystem.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Infrastructure.Services.Interfaces;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Consumers;

/// <summary>
/// Creates a course-related notification when a user is enrolled in a course.
/// </summary>
public class UserEnrolledConsumer : IConsumer<UserEnrolledEvent>
{
    private readonly INotificationService _notificationService;
    private readonly ILogger<UserEnrolledConsumer> _logger;

    public UserEnrolledConsumer(
        INotificationService notificationService,
        ILogger<UserEnrolledConsumer> logger)
    {
        _notificationService = notificationService;
        _logger = logger;
    }

    public async Task Consume(ConsumeContext<UserEnrolledEvent> context)
    {
        using var _ = _logger.BeginScope(new Dictionary<string, object?>
        {
            ["CorrelationId"] = context.CorrelationId ?? context.Message.CorrelationId,
            ["TraceId"] = context.Message.TraceId
        });

        var message = context.Message;

        _logger.LogInformation(
            "Handling UserEnrolledEvent {EventId} for User {UserId} and Course {CourseId}",
            message.EventId,
            message.UserId,
            message.CourseId);

        var title = "You enrolled in a new course";
        var content = message.CourseName is { Length: > 0 }
            ? $"You have successfully enrolled in \"{message.CourseName}\"."
            : "You have successfully enrolled in a new course.";

        var dto = new CreateNotificationDto
        {
            NotificationType = NotificationType.Course,
            Title = title,
            Content = content,
            CourseId = message.CourseId,
            UserIds = new List<Guid> { message.UserId }
        };

        await _notificationService.CreateNotificationAsync(dto);

        _logger.LogInformation(
            "UserEnrolledEvent {EventId} processed successfully",
            message.EventId);
    }
}

