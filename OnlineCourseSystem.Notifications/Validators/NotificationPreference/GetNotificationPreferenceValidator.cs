using FluentValidation;
using OnlineCourseSystem.Notifications.Features.NotificationPreference.Queries;

namespace OnlineCourseSystem.Notifications.Validators.NotificationPreference
{
    public class GetNotificationPreferenceValidator : AbstractValidator<GetNotificationPreferenceQuery>
    {
        public GetNotificationPreferenceValidator()
        {
            RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage("UserId is required.");
        }
    }
}
