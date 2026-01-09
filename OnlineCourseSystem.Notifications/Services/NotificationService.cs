using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Models.Data;
using OnlineCourseSystem.Notifications.Models.Enums;
using OnlineCourseSystem.Notifications.Services.UnitOfWork;
using System.Data;

namespace OnlineCourseSystem.Notifications.Services
{
    public class NotificationService : INotificationService
    {
        private readonly NotificationsDbContext _dbContext;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<NotificationService> _logger;

        
        private const int MaxRetryAttempts = 3; // Maximum number of retry attempts for transient failures
        private static readonly TimeSpan InitialRetryDelay = TimeSpan.FromMilliseconds(200); // Initial delay before retrying

        public NotificationService(NotificationsDbContext dbContext,
                                   IUnitOfWork unitOfWork,
                                   ILogger<NotificationService> logger)
        {
            _dbContext = dbContext;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        /// <summary>
        /// Creates a notification and sends it to the specified users asynchronously.
        /// </summary>
        /// <remarks>If the operation fails due to a transient database error, the method retries the
        /// operation up to a maximum number of attempts before propagating the exception. Logging is performed for both
        /// successful and failed attempts.</remarks>
        /// <param name="request">An object containing the notification details and the list of user IDs to receive the notification. The list
        /// of user IDs must not be empty, and all users must exist.</param>
        /// <returns>A task that represents the asynchronous operation.</returns>
        /// <exception cref="InvalidOperationException">Thrown if the list of user IDs is empty or if one or more specified users do not exist.</exception>
        public async Task CreateNotificationAsync(CreateNotificationDto request)
        {
            var distinctUserIds = request.UserIds.Distinct().ToList();

            if (!distinctUserIds.Any())
            {
                throw new InvalidOperationException("UserIds list cannot be empty.");
            }

            var allUsersExist = await _unitOfWork.UserReferences.AllUsersExistAsync(distinctUserIds);

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


        /// <summary>
        /// Calculates the expiry date for a notification based on its type and, if applicable, the course end date.
        /// </summary>
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


        /// <summary>
        /// Retrieves paginated notifications for a user, optionally filtered by read status.
        /// </summary>
        public async Task<List<UserNotificationDto>> GetUserNotificationsAsync(
            Guid userId,
            bool? isRead,
            int pageNumber,
            int pageSize)
        {
            if (!await _unitOfWork.UserReferences.ExistsAsync(userId))
            {
                throw new InvalidOperationException("User does not exist.");
            }

            var parameters = new[]
            {
                new SqlParameter("@UserId", userId),
                new SqlParameter("@IsRead", isRead ?? (object)DBNull.Value),
                new SqlParameter("@PageNumber", pageNumber),
                new SqlParameter("@PageSize", pageSize)
            };

                return await _dbContext.Database
                    .SqlQueryRaw<UserNotificationDto>(
                        "EXEC sp_GetUserNotifications @UserId, @IsRead, @PageNumber, @PageSize",
                        parameters)
                    .ToListAsync();
        }
    }
}
