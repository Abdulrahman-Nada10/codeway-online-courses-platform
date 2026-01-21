using OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork;
using OnlineCourseSystem.Notifications.Infrastructure.Services.Interfaces;
using OnlineCourseSystem.Notifications.Models;

namespace OnlineCourseSystem.Notifications.Workers
{
    /// <summary>
    /// Background worker that processes pending email notifications from the EmailOutbox.
    /// </summary>
    public class EmailOutboxWorker : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<EmailOutboxWorker> _logger;
        private readonly int _batchSize;
        private readonly TimeSpan _pollingInterval;

        public EmailOutboxWorker(
            IServiceScopeFactory scopeFactory,
            ILogger<EmailOutboxWorker> logger,
            IConfiguration configuration)
        {
            _scopeFactory = scopeFactory;
            _logger = logger;
            _batchSize = int.Parse(configuration["WorkerSettings:EmailBatchSize"] ?? "10");
            _pollingInterval = TimeSpan.FromSeconds(int.Parse(configuration["WorkerSettings:EmailPollingIntervalSeconds"] ?? "30"));
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("EmailOutboxWorker started");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await ProcessPendingEmailsAsync(stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred in EmailOutboxWorker");
                }

                await Task.Delay(_pollingInterval, stoppingToken);
            }

            _logger.LogInformation("EmailOutboxWorker stopped");
        }

        private async Task ProcessPendingEmailsAsync(CancellationToken cancellationToken)
        {

            using var scope = _scopeFactory.CreateScope();
            var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
            var emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();

            var pendingItems = await unitOfWork.EmailOutbox.GetPendingItemsAsync(_batchSize, cancellationToken);

            if (!pendingItems.Any())
            {
                return;
            }

            _logger.LogInformation("Processing {Count} pending email notifications", pendingItems.Count);

            foreach (var item in pendingItems)
            {
                try
                {
                    var success = await emailService.SendEmailAsync(
                        item.ToEmail,
                        item.Subject,
                        item.Body,
                        cancellationToken);

                    if (success)
                    {
                        await unitOfWork.EmailOutbox.MarkAsSentAsync(item.Id, cancellationToken);
                        await unitOfWork.SaveChangesAsync(cancellationToken);
                        _logger.LogInformation("Email sent successfully: {EmailId}", item.Id);
                    }
                    else
                    {
                        await HandleEmailFailureAsync(unitOfWork, item, "Email service returned false", cancellationToken);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to send email {EmailId}: {ErrorMessage}", item.Id, ex.Message);
                    await HandleEmailFailureAsync(unitOfWork, item, ex.Message, cancellationToken);
                }
            }
        }

        private async Task HandleEmailFailureAsync(
            IUnitOfWork unitOfWork,
            EmailOutbox item,
            string error,
            CancellationToken cancellationToken)
        {
            await unitOfWork.EmailOutbox.IncrementRetryCountAsync(item.Id, cancellationToken);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            var updatedItem = await unitOfWork.EmailOutbox.GetByIdAsync(item.Id, cancellationToken);

            if (updatedItem != null && updatedItem.RetryCount >= updatedItem.MaxRetries)
            {
                await unitOfWork.EmailOutbox.MarkAsFailedAsync(item.Id, error, cancellationToken);
                await unitOfWork.SaveChangesAsync(cancellationToken);
                _logger.LogWarning("Email {EmailId} marked as failed after {RetryCount} retries", item.Id, updatedItem.RetryCount);
            }
        }
    }
}
