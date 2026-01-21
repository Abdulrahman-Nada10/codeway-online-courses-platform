using FluentValidation;
using OnlineCourseSystem.Notifications.Features.Messages.DTOs;

namespace OnlineCourseSystem.Notifications.Validators.Message
{
    public class CreateMessageValidator : AbstractValidator<CreateMessageDto>
    {
        public CreateMessageValidator()
        {
            RuleFor(x => x.SenderId)
                .NotEmpty()
                .WithMessage("Sender ID is required.")
                .Must(id => id != Guid.Empty)
                .WithMessage("Sender ID must be a valid GUID.");

            RuleFor(x => x.ReceiverId)
                .NotEmpty()
                .WithMessage("Receiver ID is required.")
                .Must(id => id != Guid.Empty)
                .WithMessage("Receiver ID must be a valid GUID.")
                .NotEqual(x => x.SenderId)
                .WithMessage("Sender and receiver cannot be the same user.");

            RuleFor(x => x.Content)
                .NotEmpty()
                .WithMessage("Message content is required.")
                .MaximumLength(2000)
                .WithMessage("Message content cannot exceed 2000 characters.");
        }
    }
}


