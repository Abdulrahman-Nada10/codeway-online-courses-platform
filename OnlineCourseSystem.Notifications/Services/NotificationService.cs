using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Models.Data;
using OnlineCourseSystem.Notifications.Models.Enums;
using OnlineCourseSystem.Notifications.Services.Repositories;
using System.Data;

namespace OnlineCourseSystem.Notifications.Services
{
    public class NotificationService : INotificationService
    {
        private readonly NotificationsDbContext _dbContext;
        private readonly IUserReferenceRepository _userReferenceRepository;
        private readonly ILogger<NotificationService> _logger;

        
        private const int MaxRetryAttempts = 3; // Maximum number of retry attempts for transient failures
        private static readonly TimeSpan InitialRetryDelay = TimeSpan.FromMilliseconds(200); // Initial delay before retrying

        public NotificationService(NotificationsDbContext dbContext,
                                   IUserReferenceRepository userReferenceRepository,
                                   ILogger<NotificationService> logger)
        {
            _dbContext = dbContext;
            _userReferenceRepository = userReferenceRepository;
            _logger = logger;
        }

        public async Task CreateNotificationAsync(CreateNotificationDto request)
        {
            var distinctUserIds = request.UserIds.Distinct().ToList();

            if (!distinctUserIds.Any())
            {
                throw new InvalidOperationException("UserIds list cannot be empty.");
            }

            var allUsersExist = await _userReferenceRepository.AllUsersExistAsync(distinctUserIds);

            if (!allUsersExist)
            {
                _logger.LogWarning(
                    "CreateNotification failed: one or more users do not exist.");

                throw new InvalidOperationException(
                    "One or more users do not exist.");
            }

            // TVP
            var userIdsTable = new DataTable();
            userIdsTable.Columns.Add("UserId", typeof(Guid));

            foreach (var userId in distinctUserIds)
            {
                userIdsTable.Rows.Add(userId);
            }

            var notificationType = request.NotificationType;

            var parameters = new[]
            {
                new SqlParameter("@Type", notificationType.ToString()),
                new SqlParameter("@Title", request.Title),
                new SqlParameter("@Content", request.Content),
                new SqlParameter("@CourseId", request.CourseId ?? (object)DBNull.Value),
                new SqlParameter("@ExpiryAt", CalculateExpiry(notificationType, DateTime.UtcNow.AddDays(7))),
                new SqlParameter
                {
                    ParameterName = "@UserIds",
                    SqlDbType = SqlDbType.Structured,
                    TypeName = "dbo.UserIdTableType",
                    Value = userIdsTable
                }
            };

            var delay = InitialRetryDelay;

            for (var attempt = 1; attempt <= MaxRetryAttempts; attempt++)
            {
                try
                {
                    await _dbContext.Database.ExecuteSqlRawAsync(
                        "EXEC dbo.sp_CreateNotification @Type, @Title, @Content, @CourseId, @ExpiryAt, @UserIds",
                        parameters
                    );

                    _logger.LogInformation(
                        "Notification ({NotificationType}) created successfully for {RecipientCount} users.",
                        notificationType,
                        distinctUserIds.Count);

                    return;
                }
                catch (SqlException ex)
                {
                    var isLastAttempt = attempt == MaxRetryAttempts;

                    _logger.LogWarning(
                        ex,
                        "Failed to execute sp_CreateNotification (attempt {Attempt}/{MaxAttempts}).",
                        attempt,
                        MaxRetryAttempts);

                    if (isLastAttempt)
                    {
                        _logger.LogError(
                            ex,
                            "Notification creation failed after {Attempts} attempts.",
                            MaxRetryAttempts);
                        throw;
                    }

                    await Task.Delay(delay);
                    delay *= 2;
                }
            }
        }

        private DateTime CalculateExpiry(NotificationType type, DateTime? courseEndDate)
        {
            return type switch
            {
                NotificationType.Course => courseEndDate?.AddDays(7) ?? DateTime.UtcNow.AddDays(7),
                NotificationType.System => DateTime.UtcNow.AddDays(30),
                NotificationType.Announcement => DateTime.UtcNow.AddDays(7),
                NotificationType.Reminder => DateTime.UtcNow.AddDays(7),
                _ => DateTime.UtcNow.AddDays(7)
            };
        }

    }
}
