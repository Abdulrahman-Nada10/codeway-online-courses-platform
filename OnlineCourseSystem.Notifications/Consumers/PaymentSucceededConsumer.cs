using MassTransit;
using OnlineCourseSystem.Contracts.Messaging.Events;
using OnlineCourseSystem.Notifications.Features.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Infrastructure.Services.Interfaces;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Consumers;

/// <summary>
/// Creates a system notification when a payment succeeds.
/// </summary>
public class PaymentSucceededConsumer : IConsumer<PaymentSucceededEvent>
{
    private readonly INotificationService _notificationService;
    private readonly ILogger<PaymentSucceededConsumer> _logger;

    public PaymentSucceededConsumer(
        INotificationService notificationService,
        ILogger<PaymentSucceededConsumer> logger)
    {
        _notificationService = notificationService;
        _logger = logger;
    }

    public async Task Consume(ConsumeContext<PaymentSucceededEvent> context)
    {
        using var _ = _logger.BeginScope(new Dictionary<string, object?>
        {
            ["CorrelationId"] = context.CorrelationId ?? context.Message.CorrelationId,
            ["TraceId"] = context.Message.TraceId
        });

        var message = context.Message;

        _logger.LogInformation(
            "Handling PaymentSucceededEvent {EventId} for User {UserId}, Amount {Amount} {Currency}",
            message.EventId,
            message.UserId,
            message.Amount,
            message.Currency);

        var title = "Payment succeeded";

        var description = message.Description ?? "Your payment was processed successfully.";
        var amountInfo = message.Amount > 0
            ? $" Amount: {message.Amount} {message.Currency ?? string.Empty}".TrimEnd()
            : string.Empty;

        var content = $"{description}{amountInfo}";

        var dto = new CreateNotificationDto
        {
            NotificationType = NotificationType.System,
            Title = title,
            Content = content,
            CourseId = message.CourseId,
            UserIds = new List<Guid> { message.UserId }
        };

        await _notificationService.CreateNotificationAsync(dto);

        _logger.LogInformation(
            "PaymentSucceededEvent {EventId} processed successfully",
            message.EventId);
    }
}

