using MediatR;
using OnlineCourseSystem.Notifications.Exceptions;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork;

namespace OnlineCourseSystem.Notifications.Features.Notifications.Commands.MarkAsRead
{
    public class MarkNotificationAsReadCommandHandler : IRequestHandler<MarkNotificationAsReadCommand>
    {
        private readonly IUnitOfWork _unitOfWork;

        public MarkNotificationAsReadCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(MarkNotificationAsReadCommand request, CancellationToken cancellationToken)
        {
            var notification = await _unitOfWork.Notifications
                .GetUserNotificationByIdAsync(request.UserNotificationId, cancellationToken);

            if (notification is null)
                throw new NotFoundException("User Notification", request.UserNotificationId);

            if (notification.IsRead)
                throw new AlreadyProcessedException("Notifacation For This User", "Readed");

            notification.IsRead = true;
            notification.ReadAt = DateTime.UtcNow;

            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
