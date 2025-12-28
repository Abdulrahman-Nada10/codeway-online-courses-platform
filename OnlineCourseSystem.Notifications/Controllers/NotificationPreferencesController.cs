using Microsoft.AspNetCore.Mvc;
using OnlineCourseSystem.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Services;
using GlobalResponse.Shared.Extensions;
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
        private readonly IPreferenceService _service;

        /// <summary>
        /// Initializes a new instance of the <see cref="NotificationPreferencesController"/> class.
        /// </summary>
        /// <param name="service">Service responsible for managing notification preferences.</param>
        public NotificationPreferencesController(
            IPreferenceService service)
        {
            _service = service;
        }

        /// <summary>
        /// Retrieves notification preferences for a specific user.
        /// </summary>
        /// <param name="userId">The unique identifier of the user.</param>
        /// <returns>
        /// Returns the notification preferences associated with the specified user.
        /// </returns>
        /// <response code="200">Notification preferences returned successfully.</response>
        /// <response code="500">User or notification preferences were not found.</response>
        [HttpGet("{userId:guid}")]
        public async Task<IActionResult> Get(Guid userId)
        {
            var result = await _service.GetAsync(userId);

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
            await _service.UpdateAsync(userId, request);

            return this.OkResponse(
                true,
                "Preferences updated successfully"
            );
        }
    }
}
