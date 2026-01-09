using FluentValidation;
using OnlineCourseSystem.Notifications.DTOs;

namespace OnlineCourseSystem.Notifications.Validators.Notification
{
    public class GetUserNotificationValidator : AbstractValidator<GetUserNotificationsQuery>
    {
        public GetUserNotificationValidator()
        {
            RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage("UserId is required.");

            RuleFor(x => x.PageNumber)
                .GreaterThanOrEqualTo(1)
                .WithMessage("PageNumber must be greater than or equal to 1.");

            RuleFor(x => x.PageSize)
                .GreaterThan(0)
                .WithMessage("PageSize must be greater than 0.")
                .LessThanOrEqualTo(100)
                .WithMessage("PageSize cannot exceed 100.");
        }
    }
}
