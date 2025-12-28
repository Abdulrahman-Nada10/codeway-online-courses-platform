using FluentValidation;
using OnlineCourseSystem.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Validators
{
    public class UpdateNotificationPreferenceDtoValidator : AbstractValidator<UpdateNotificationPreferenceDto>
    {
        public UpdateNotificationPreferenceDtoValidator()
        {
            RuleFor(x => x.NotificationType)
                .IsInEnum()
                .WithMessage($"Invalid notification type. Allowed values: {string.Join(", ", Enum.GetNames<NotificationType>())}.");

            RuleFor(x => x)
                .Must(x => x.Email || x.Push)
                .WithMessage("At least one notification channel (Email or Push) must be enabled.");
        }
    }
}
