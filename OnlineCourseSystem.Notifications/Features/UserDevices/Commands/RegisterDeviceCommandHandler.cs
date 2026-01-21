using MediatR;
using OnlineCourseSystem.Notifications.Exceptions;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork;
using OnlineCourseSystem.Notifications.Models;

namespace OnlineCourseSystem.Notifications.Features.UserDevices.Commands
{
    public class RegisterDeviceCommandHandler : IRequestHandler<RegisterDeviceCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<RegisterDeviceCommandHandler> _logger;

        public RegisterDeviceCommandHandler(
            IUnitOfWork unitOfWork,
            ILogger<RegisterDeviceCommandHandler> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task Handle(RegisterDeviceCommand request, CancellationToken cancellationToken)
        {
            // Validate user exists
            if (!await _unitOfWork.UserReferences.ExistsAsync(request.UserId))
            {
                throw new NotFoundException("User", request.UserId);
            }

            // Check if device token already exists for this user
            var existingDevice = await _unitOfWork.UserDevices
                .DeviceExistForUserAsync(request.UserId, request.DeviceToken, cancellationToken);

            if (existingDevice != null)
            {
                // Reactivate device if it was deactivated
                if (!existingDevice.IsActive)
                {
                    existingDevice.IsActive = true;
                    existingDevice.Platform = request.Platform;

                    await _unitOfWork.SaveChangesAsync(cancellationToken);
                    
                    _logger.LogInformation(
                        "Reactivated existing device {DeviceId} for user {UserId}", 
                        existingDevice.Id, request.UserId);
                }
                else
                {
                    _logger.LogInformation(
                        "Device already registered and active for user {UserId}", 
                        request.UserId);
                }
                return;
            }

            // Create new device registration
            var device = new UserDevice
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                DeviceToken = request.DeviceToken,
                Platform = request.Platform,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            await _unitOfWork.UserDevices.AddDeviceAsync(device, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Device registered successfully: {DeviceId} for user {UserId} on platform {Platform}", 
                device.Id, request.UserId, request.Platform);
        }
    }
}
