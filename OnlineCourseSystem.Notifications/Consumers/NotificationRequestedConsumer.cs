using MassTransit;
using OnlineCourseSystem.Contracts.Messaging.Events;
using OnlineCourseSystem.Notifications.Features.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork;
using OnlineCourseSystem.Notifications.Infrastructure.Services.Interfaces;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Consumers;

/// <summary>
/// Handles NotificationRequestedEvent messages and creates notifications
/// for the requested users using the existing NotificationService.
/// Also creates delivery tracking entries for in-app notifications.
/// </summary>
public class NotificationRequestedConsumer : IConsumer<NotificationRequestedEvent>
{
    private readonly INotificationService _notificationService;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<NotificationRequestedConsumer> _logger;

    public NotificationRequestedConsumer(
        INotificationService notificationService,
        IUnitOfWork unitOfWork,
        ILogger<NotificationRequestedConsumer> logger)
    {
        _notificationService = notificationService;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task Consume(ConsumeContext<NotificationRequestedEvent> context)
    {
        using var _ = _logger.BeginScope(new Dictionary<string, object?>
        {
            ["CorrelationId"] = context.CorrelationId ?? context.Message.CorrelationId,
            ["TraceId"] = context.Message.TraceId
        });

        var message = context.Message;

        _logger.LogInformation(
            "Handling NotificationRequestedEvent {EventId} for {UserCount} users",
            message.EventId,
            message.UserIds.Count);

        var notificationType = MapNotificationType(message.NotificationType);

        var dto = new CreateNotificationDto
        {
            NotificationType = notificationType,
            Title = message.Title,
            Content = message.Content,
            CourseId = message.CourseId,
            UserIds = message.UserIds.ToList()
        };

        var userNotificationIds = await _notificationService.CreateNotificationAsync(dto);

        var deliveries = userNotificationIds.Select(unId => new UserNotificationDelivery
        {
            UserNotificationId = unId,
            Channel = "InApp",
            Status = "Sent",
            DeliveredAt = DateTime.UtcNow
        });

        await _unitOfWork.UserNotificationDeliveries.AddRangeAsync(deliveries, context.CancellationToken);
        await _unitOfWork.SaveChangesAsync(context.CancellationToken);

        _logger.LogInformation(
            "NotificationRequestedEvent {EventId} processed successfully",
            message.EventId);
    }

    private static NotificationType MapNotificationType(string type)
        => Enum.TryParse<NotificationType>(type, ignoreCase: true, out var parsed)
            ? parsed
            : NotificationType.System;
}

