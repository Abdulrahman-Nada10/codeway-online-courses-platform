using FluentValidation;
using OnlineCourseSystem.Notifications.Features.Messages.Queries;

namespace OnlineCourseSystem.Notifications.Validators.Message
{
    public class GetConversationValidator : AbstractValidator<GetConversationQuery>
    {
        public GetConversationValidator()
        {
            RuleFor(x => x.ConversationId)
                .NotEmpty()
                .WithMessage("ConversationId is required.");

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
