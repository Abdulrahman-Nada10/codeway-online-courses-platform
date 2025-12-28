using GlobalResponse.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;
using OnlineCourseSystem.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Services;

namespace OnlineCourseSystem.Notifications.Controllers
{
    /// <summary>
    /// Handles notification creation operations.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        /// <summary>
        /// Initializes a new instance of the <see cref="NotificationsController"/> class.
        /// </summary>
        /// <param name="notificationService">
        /// Service responsible for creating notifications.
        /// </param>
        public NotificationsController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        /// <summary>
        /// Creates a new notification for one or more users.
        /// </summary>
        /// <param name="request">
        /// The notification creation request containing notification data and target users.
        /// </param>
        /// <returns>
        /// Returns a success response when the notification is created successfully.
        /// </returns>
        /// <response code="200">Notification created successfully.</response>
        /// <response code="400">The request payload is invalid.</response>
        /// <response code="500">An unexpected error occurred while creating the notification.</response>
        [HttpPost]
        public async Task<IActionResult> Create(CreateNotificationDto request)
        {
            await _notificationService.CreateNotificationAsync(request);

            return this.OkResponse("Notification created successfully");
        }
    }
}
