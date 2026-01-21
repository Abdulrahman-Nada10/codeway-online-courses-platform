using MediatR;

namespace OnlineCourseSystem.Notifications.Features.UserDevices.Commands
{
    public class RegisterDeviceCommand : IRequest
    {
        public Guid UserId { get; }
        public string DeviceToken { get; }
        public byte Platform { get; }

        public RegisterDeviceCommand(Guid userId, string deviceToken, byte platform)
        {
            UserId = userId;
            DeviceToken = deviceToken;
            Platform = platform;
        }
    }
}
