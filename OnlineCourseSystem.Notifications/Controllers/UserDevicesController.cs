using GlobalResponse.Shared.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using OnlineCourseSystem.Notifications.Features.UserDevices.Commands;
using OnlineCourseSystem.Notifications.Features.UserDevices.DTOs;

namespace OnlineCourseSystem.Notifications.Controllers
{
    /// <summary>
    /// Handles user device registration for push notifications.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserDevicesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserDevicesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Registers a device for push notifications.
        /// </summary>
        /// <param name="userId">The user ID who owns the device.</param>
        /// <param name="request">Device registration information (device token and platform).</param>
        /// <returns>Success response when device is registered.</returns>
        /// <remarks>
        /// This endpoint should be called:
        /// - When user logs in on a mobile device
        /// - When app receives a new FCM token from Firebase
        /// - When user enables push notifications
        /// 
        /// Platform values:
        /// - 0 = Android
        /// - 1 = iOS
        /// - 2 = Web
        /// </remarks>
        [HttpPost("{userId:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> RegisterDevice(
            Guid userId,
            [FromBody] RegisterDeviceDto request)
        {
            var command = new RegisterDeviceCommand(
                userId,
                request.DeviceToken,
                request.Platform);

            await _mediator.Send(command);

            return this.OkResponse("Device registered successfully for push notifications.");
        }
    }
}
