using GlobalResponse.Shared.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using OnlineCourseSystem.Notifications.Features.ScheduledNotifications.Commands;
using OnlineCourseSystem.Notifications.Features.ScheduledNotifications.DTOs;

namespace OnlineCourseSystem.Notifications.Controllers
{
    /// <summary>
    /// Handles scheduling of notifications for future delivery.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduledNotificationsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ScheduledNotificationsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Schedules a notification to be sent at a specific time.
        /// </summary>
        /// <param name="request">The scheduling request.</param>
        /// <returns>The ID of the scheduled notification.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Schedule([FromBody] ScheduleNotificationRequestDto request)
        {
            var command = new ScheduleNotificationCommand(
                request.NotificationType,
                request.Title,
                request.Content,
                request.UserIds,
                request.ScheduledFor,
                request.CourseId);

            var scheduledId = await _mediator.Send(command);

            return this.OkResponse(
                new { ScheduledNotificationId = scheduledId },
                "Notification scheduled successfully");
        }
    }
}
