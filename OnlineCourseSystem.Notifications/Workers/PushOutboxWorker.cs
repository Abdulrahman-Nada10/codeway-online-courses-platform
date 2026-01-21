using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork;
using OnlineCourseSystem.Notifications.Infrastructure.Services.Interfaces;
using OnlineCourseSystem.Notifications.Models;

namespace OnlineCourseSystem.Notifications.Workers
{
    /// <summary>
    /// Background worker that processes pending push notifications from the PushOutbox.
    /// </summary>
    public class PushOutboxWorker : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<PushOutboxWorker> _logger;
        private readonly int _batchSize;
        private readonly TimeSpan _pollingInterval;

        public PushOutboxWorker(
            IServiceProvider serviceProvider,
            ILogger<PushOutboxWorker> logger,
            IConfiguration configuration)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
            _batchSize = int.Parse(configuration["WorkerSettings:PushBatchSize"] ?? "10");
            _pollingInterval = TimeSpan.FromSeconds(int.Parse(configuration["WorkerSettings:PushPollingIntervalSeconds"] ?? "30"));
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("PushOutboxWorker started");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await ProcessPendingPushNotificationsAsync(stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred in PushOutboxWorker");
                }

                await Task.Delay(_pollingInterval, stoppingToken);
            }

            _logger.LogInformation("PushOutboxWorker stopped");
        }

        private async Task ProcessPendingPushNotificationsAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
            var pushNotificationService = scope.ServiceProvider.GetRequiredService<IPushNotificationService>();

            var pendingItems = await unitOfWork.PushOutbox.GetPendingItemsAsync(_batchSize, cancellationToken);

            if (!pendingItems.Any())
            {
                return;
            }

            _logger.LogInformation("Processing {Count} pending push notifications", pendingItems.Count);

            foreach (var item in pendingItems)
            {
                try
                {
                    var success = await pushNotificationService.SendPushNotificationAsync(
                        item.UserId,
                        item.Title,
                        item.Body,
                        cancellationToken);

                    if (success)
                    {
                        await unitOfWork.PushOutbox.MarkAsSentAsync(item.Id, cancellationToken);
                        await unitOfWork.SaveChangesAsync(cancellationToken);
                        _logger.LogInformation("Push notification sent successfully: {PushId}", item.Id);
                    }
                    else
                    {
                        await HandlePushFailureAsync(unitOfWork, item, "Push service returned false", cancellationToken);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to send push notification {PushId}: {ErrorMessage}", item.Id, ex.Message);
                    await HandlePushFailureAsync(unitOfWork, item, ex.Message, cancellationToken);
                }
            }
        }

        private async Task HandlePushFailureAsync(
            IUnitOfWork unitOfWork,
            PushOutbox item,
            string error,
            CancellationToken cancellationToken)
        {
            await unitOfWork.PushOutbox.IncrementRetryCountAsync(item.Id, cancellationToken);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            var updatedItem = await unitOfWork.PushOutbox.GetByIdAsync(item.Id, cancellationToken);

            if (updatedItem != null && updatedItem.RetryCount >= updatedItem.MaxRetries)
            {
                await unitOfWork.PushOutbox.MarkAsFailedAsync(item.Id, error, cancellationToken);
                await unitOfWork.SaveChangesAsync(cancellationToken);
                _logger.LogWarning("Push notification {PushId} marked as failed after {RetryCount} retries", item.Id, updatedItem.RetryCount);
            }
        }
    }
}
