using FluentValidation;
using OnlineCourseSystem.Notifications.Features.Notifications.Commands.MarkAsRead;

namespace OnlineCourseSystem.Notifications.Validators.Notification
{
    public class MarkNotificationAsReadValidator : AbstractValidator<MarkNotificationAsReadCommand>
    {
        public MarkNotificationAsReadValidator()
        {
            RuleFor(command => command.UserNotificationId)
                .NotEmpty().WithMessage("User Notification ID must not be empty.");
        }
    }
}
