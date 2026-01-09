using GlobalResponse.Shared.Extensions;
using GlobalResponse.Shared.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using OnlineCourseSystem.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Features.Notifications.Commands.MarkAsRead;
using OnlineCourseSystem.Notifications.Models.Enums;
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
        public async Task<IActionResult> Create(CreateNotificationDto request)
        {
            await _notificationService.CreateNotificationAsync(request);

            return this.OkResponse("Notification created successfully");
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


        /// <summary>
        /// Marks a specific notification as read.
        /// </summary>
        /// <param name="id">Notification unique identifier.</param>
        /// <returns>Success result.</returns>
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
