using FluentValidation;
using OnlineCourseSystem.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Models.Enums;

namespace OnlineCourseSystem.Notifications.Validators.Notification
{
    public class CreateNotificationValidator : AbstractValidator<CreateNotificationDto>
    {
        public CreateNotificationValidator()
        {
            RuleFor(x => x.NotificationType)
                .IsInEnum()
                .WithMessage($"Invalid notification type. Allowed values: {string.Join(", ", Enum.GetNames<NotificationType>())}.");

            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(200).WithMessage("Title cannot exceed 200 characters.");

            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Content is required.")
                .MaximumLength(1000).WithMessage("Content cannot exceed 1000 characters.");

            RuleFor(x => x.UserIds)
                .NotNull().WithMessage("UserIds is required.")
                .NotEmpty().WithMessage("At least one userId is required.")
                .Must(userIds => userIds != null && userIds.Count > 0)
                .WithMessage("UserIds list cannot be empty.");

            // Conditional Validation for CourseId
            RuleFor(x => x.CourseId)
                .NotEmpty().WithMessage("CourseId is required when notification type is 'Course'.")
                .When(x => x.NotificationType == NotificationType.Course);

            // Ensure CourseId is null for non-Course notifications
            RuleFor(x => x.CourseId)
                .Null().WithMessage("CourseId should not be provided for non-Course notifications.")
                .When(x => x.NotificationType != NotificationType.Course);
        }
    }
}
