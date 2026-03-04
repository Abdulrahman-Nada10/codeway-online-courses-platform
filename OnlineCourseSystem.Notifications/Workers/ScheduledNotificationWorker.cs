using OnlineCourseSystem.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork;
using OnlineCourseSystem.Notifications.Infrastructure.Services.Interfaces;
using OnlineCourseSystem.Notifications.Models.Enums;
using System.Text.Json;

namespace OnlineCourseSystem.Notifications.Workers
{
    /// <summary>
    /// Background worker that processes scheduled notifications (reminders, due dates, etc.).
    /// </summary>
    public class ScheduledNotificationWorker : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<ScheduledNotificationWorker> _logger;
        private readonly int _batchSize;
        private readonly TimeSpan _pollingInterval;

        public ScheduledNotificationWorker(
            IServiceProvider serviceProvider,
            ILogger<ScheduledNotificationWorker> logger,
            IConfiguration configuration)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
            _batchSize = int.Parse(configuration["WorkerSettings:ScheduledBatchSize"] ?? "10");
            _pollingInterval = TimeSpan.FromSeconds(int.Parse(configuration["WorkerSettings:ScheduledPollingIntervalSeconds"] ?? "60"));
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("ScheduledNotificationWorker started");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await ProcessScheduledNotificationsAsync(stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred in ScheduledNotificationWorker");
                }

                await Task.Delay(_pollingInterval, stoppingToken);
            }

            _logger.LogInformation("ScheduledNotificationWorker stopped");
        }

        private async Task ProcessScheduledNotificationsAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
            var notificationService = scope.ServiceProvider.GetRequiredService<INotificationService>();

            var dueNotifications = await unitOfWork.ScheduledNotifications.GetDueNotificationsAsync(_batchSize, cancellationToken);

            if (!dueNotifications.Any())
            {
                return;
            }

            _logger.LogInformation("Processing {Count} scheduled notifications", dueNotifications.Count);

            foreach (var scheduled in dueNotifications)
            {
                try
                {
                    // Parse user IDs from JSON
                    var userIds = JsonSerializer.Deserialize<List<Guid>>(scheduled.UserIdsJson) ?? new List<Guid>();

                    if (!userIds.Any())
                    {
                        await unitOfWork.ScheduledNotifications.MarkAsFailedAsync(scheduled.Id, "No user IDs found", cancellationToken);
                        await unitOfWork.SaveChangesAsync(cancellationToken);
                        continue;
                    }

                    // Parse notification type enum
                    if (!Enum.TryParse<NotificationType>(scheduled.NotificationType, out var notificationType))
                    {
                        await unitOfWork.ScheduledNotifications.MarkAsFailedAsync(scheduled.Id, $"Invalid notification type: {scheduled.NotificationType}", cancellationToken);
                        await unitOfWork.SaveChangesAsync(cancellationToken);
                        continue;
                    }

                    // Create notification using NotificationService (reuses existing logic with retry mechanism)
                    var createNotificationDto = new CreateNotificationDto
                    {
                        NotificationType = notificationType,
                        Title = scheduled.Title,
                        Content = scheduled.Content,
                        CourseId = scheduled.CourseId,
                        UserIds = userIds
                    };

                    await notificationService.CreateNotificationAsync(createNotificationDto);

                    await unitOfWork.ScheduledNotifications.MarkAsProcessedAsync(scheduled.Id, cancellationToken);
                    await unitOfWork.SaveChangesAsync(cancellationToken);
                    _logger.LogInformation("Scheduled notification {ScheduledId} processed successfully", scheduled.Id);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to process scheduled notification {ScheduledId}: {ErrorMessage}", scheduled.Id, ex.Message);
                    await unitOfWork.ScheduledNotifications.MarkAsFailedAsync(scheduled.Id, ex.Message, cancellationToken);
                    await unitOfWork.SaveChangesAsync(cancellationToken);
                }
            }
        }
    }
}
