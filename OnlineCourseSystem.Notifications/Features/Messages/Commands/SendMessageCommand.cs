using MediatR;
using OnlineCourseSystem.Notifications.Features.Messages.DTOs;

namespace OnlineCourseSystem.Notifications.Features.Messages.Commands
{
    public class SendMessageCommand : IRequest<MessageDto>
    {
        public CreateMessageDto Request { get; }

        public SendMessageCommand(CreateMessageDto request)
        {
            Request = request;
        }
    }
}

