using GlobalResponse.Shared.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using OnlineCourseSystem.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Features.NotificationPreference.Commands;
using OnlineCourseSystem.Notifications.Features.NotificationPreference.Queries;
using OnlineCourseSystem.Notifications.Features.Notifications.Commands.MarkAsRead;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Services;
using System.Security.Claims;

namespace OnlineCourseSystem.Notifications.Controllers
{
    /// <summary>
    /// Manages notification preferences for users.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationPreferencesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public NotificationPreferencesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Retrieves notification preferences for a specific user.
        /// </summary>
        /// <param name="userId">The unique identifier of the user.</param>
        /// <response code="200">Notification preferences returned successfully.</response>
        /// <response code="404">User or notification preferences were not found.</response>
        [HttpGet("{userId:guid}")]
        public async Task<IActionResult> Get(Guid userId)
        {
            var query = new GetNotificationPreferenceQuery(userId);

            // Explicitly specify the result type as object? since IMediator.Send returns object? for non-generic IRequest
            var result = await _mediator.Send(query);

            return this.OkResponse(
                result,
                "Notification preferences returned successfully"
            );
        }

        /// <summary>
        /// Updates notification preferences for a specific user.
        /// </summary>
        /// <param name="userId">The unique identifier of the user.</param>
        /// <param name="request">The updated notification preference values.</param>
        /// <returns>
        /// Returns a success response if the preferences were updated successfully.
        /// </returns>
        /// <response code="200">Preferences updated successfully.</response>
        /// <response code="400">The provided request is invalid.</response>
        /// <response code="500">User or notification preferences were not found.</response>
        [HttpPost("{userId:guid}")]
        public async Task<IActionResult> Update(
            Guid userId,
            UpdateNotificationPreferenceDto request)
        {
            var command = new UpdateNotificationPreferenceCommand(userId, request);

            var result = await _mediator.Send(command);

            return this.OkResponse(
                result,
                "Preferences updated successfully"
            );
        }
    }
}
