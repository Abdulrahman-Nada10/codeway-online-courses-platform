using GlobalResponse.Shared.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineCourseSystem.Notifications.Features.Notifications.Commands.MarkAsRead;
using OnlineCourseSystem.Notifications.Features.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Infrastructure.Services.Interfaces;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Controllers
{
    /// <summary>
    /// Handles notification creation operations.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        private readonly IMediator _mediator;

        public NotificationsController(INotificationService notificationService, IMediator mediator)
        {
            _notificationService = notificationService;
            _mediator = mediator;
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
        [Authorize(Roles = "Admin,Instructor")]
        public async Task<IActionResult> Create(CreateNotificationDto request)
        {
            var userNotificationIds = await _notificationService.CreateNotificationAsync(request);

            return this.OkResponse(userNotificationIds, "Notification created successfully");
        }


        /// <summary>
        /// Retrieves a paginated list of notifications for the specified user.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] GetUserNotificationsQuery query)
        {
            var result = await _notificationService.GetUserNotificationsAsync(
                query.UserId,
                query.IsRead,
                query.PageNumber,
                query.PageSize);

            return this.OkResponse(
                result,
                "User notifications returned successfully");
        }


        // انا شايف ان هيبقي افضل لو دخلنا النوتيفيكيشن اي دي وجبنا اليوزر اي دي من التوكن افضل من اننا ندخل اليوزر نوتيفيكيشن اي دي
        /// <summary>
        /// Marks a specific notification for User as read.
        /// </summary>
        /// <param name="id">User Notification unique identifier.</param>
        [HttpPost("{id:guid}/read")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> MarkAsRead(Guid id)
        {
            var command = new MarkNotificationAsReadCommand(id);

            await _mediator.Send(command);

            return this.OkResponse("Notification Readed successfully");
        }


        /// <summary>
        /// Retrieves all available notification types.
        /// </summary>
        [HttpGet("Types")]
        [AllowAnonymous]
        public IActionResult GetNotificationTypes()
        {
            var types = Enum.GetValues(typeof(NotificationType))
                .Cast<NotificationType>()
                .Select(t => new
                {
                    Id = (int)t,
                    Name = t.ToString()
                })
                .ToList();

            return this.OkResponse(types,"Notification Types Returned successfully");
        } 

    }
}
