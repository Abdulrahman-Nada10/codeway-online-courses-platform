using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Infrastructure.Services.Interfaces;
using OnlineCourseSystem.Notifications.Models.Data;

namespace OnlineCourseSystem.Notifications.Infrastructure.Services
{
    /// <summary>
    /// Firebase Cloud Messaging (FCM) push notification service implementation.
    /// </summary>
    public class PushNotificationService : IPushNotificationService
    {
        private readonly NotificationsDbContext _context;
        private readonly ILogger<PushNotificationService> _logger;
        private readonly IConfiguration _configuration;

        public PushNotificationService(
            NotificationsDbContext context,
            ILogger<PushNotificationService> logger,
            IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _configuration = configuration;
            InitializeFirebase();
        }

        private void InitializeFirebase()
        {
            try
            {
                if (FirebaseApp.DefaultInstance == null)
                {
                    var credentialsPath = _configuration["Firebase:CredentialsPath"];
                    if (!string.IsNullOrWhiteSpace(credentialsPath) && File.Exists(credentialsPath))
                    {
                        var credential = GoogleCredential.FromFile(credentialsPath);
                        FirebaseApp.Create(new AppOptions
                        {
                            Credential = credential
                        });
                        _logger.LogInformation("Firebase initialized successfully");
                    }
                    else
                    {
                        _logger.LogWarning("Firebase credentials not found. Push notifications will be disabled.");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to initialize Firebase: {ErrorMessage}", ex.Message);
            }
        }

        public async Task<bool> SendPushNotificationAsync(Guid userId, string title, string body, CancellationToken cancellationToken = default)
        {
            if (FirebaseApp.DefaultInstance == null)
            {
                _logger.LogWarning("Firebase not initialized. Skipping push notification.");
                return false;
            }

            try
            {
                var devices = await _context.UserDevices
                    .Where(d => d.UserId == userId && d.IsActive)
                    .ToListAsync(cancellationToken);

                if (!devices.Any())
                {
                    _logger.LogInformation("No active devices found for user {UserId}", userId);
                    return false;
                }

                var messaging = FirebaseMessaging.DefaultInstance;
                var successCount = 0;

                foreach (var device in devices)
                {
                    try
                    {
                        var message = new Message
                        {
                            Token = device.DeviceToken,
                            Notification = new Notification
                            {
                                Title = title,
                                Body = body
                            },
                            Android = new AndroidConfig
                            {
                                Priority = Priority.High
                            },
                            Apns = new ApnsConfig
                            {
                                Aps = new Aps
                                {
                                    Sound = "default",
                                    Badge = 1
                                }
                            }
                        };

                        var response = await messaging.SendAsync(message, cancellationToken);
                        _logger.LogInformation("Push notification sent to device {DeviceId} for user {UserId}: {MessageId}", 
                            device.Id, userId, response);
                        successCount++;
                    }
                    catch (FirebaseMessagingException ex)
                    {
                        _logger.LogWarning(ex, "Failed to send push notification to device {DeviceId}: {Error}", 
                            device.Id, ex.Message);

                        // If token is invalid, mark device as inactive
                        if (ex.MessagingErrorCode == MessagingErrorCode.InvalidArgument ||
                            ex.MessagingErrorCode == MessagingErrorCode.Unregistered)
                        {
                            device.IsActive = false;
                            await _context.SaveChangesAsync(cancellationToken);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Unexpected error sending push notification to device {DeviceId}", device.Id);
                    }
                }

                return successCount > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send push notification to user {UserId}: {ErrorMessage}", userId, ex.Message);
                return false;
            }
        }
    }
}
