using FluentValidation;
using OnlineCourseSystem.Notifications.Features.Notifications.Commands.MarkAsRead;

namespace OnlineCourseSystem.Notifications.Validators.Notification
{
    public class MarkNotificationAsReadCommandValidator : AbstractValidator<MarkNotificationAsReadCommand>
    {
        public MarkNotificationAsReadCommandValidator()
        {
            RuleFor(command => command.NotificationId)
                .NotEmpty().WithMessage("Notification ID must not be empty.");
        }
    }
}
