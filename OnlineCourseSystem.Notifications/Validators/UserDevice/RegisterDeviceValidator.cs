using FluentValidation;
using OnlineCourseSystem.Notifications.Features.UserDevices.DTOs;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Validators.UserDevice
{
    public class RegisterDeviceValidator : AbstractValidator<RegisterDeviceDto>
    {
        public RegisterDeviceValidator()
        {
            RuleFor(x => x.DeviceToken)
                .NotEmpty()
                .WithMessage("Device token is required.")
                .MaximumLength(500)
                .WithMessage("Device token cannot exceed 500 characters.");

            RuleFor(x => x.Platform)
                .Must(p => Enum.IsDefined(typeof(Platform), p))
                .WithMessage("Platform must be 0 (Android), 1 (iOS), or 2 (Web).");
        }
    }
}
