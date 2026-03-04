using MediatR;
using OnlineCourseSystem.Notifications.Exceptions;
using OnlineCourseSystem.Notifications.Features.NotificationPreference.DTOs;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork;

namespace OnlineCourseSystem.Notifications.Features.NotificationPreference.Commands
{
    public class UpdateNotificationPreferenceCommandHandler : IRequestHandler<UpdateNotificationPreferenceCommand, NotificationPreferenceDto>
    {
        private readonly IUnitOfWork _unitOfWork;

        public UpdateNotificationPreferenceCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<NotificationPreferenceDto> Handle(UpdateNotificationPreferenceCommand request, CancellationToken cancellationToken)
        {
            if (!await _unitOfWork.UserReferences.ExistsAsync(request.UserId))
            {
                throw new NotFoundException("User", request.UserId);
            }

            var pref = await _unitOfWork.NotificationPreferences
                .GetAsync(request.UserId, request.Preference.NotificationType);

            if (pref == null)
                throw new NotFoundException(
                    "NotificationPreference",
                    $"{request.UserId} - {request.Preference.NotificationType}");

            pref.Email = request.Preference.Email;
            pref.Push = request.Preference.Push;

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return new NotificationPreferenceDto
            {
                NotificationType = pref.NotificationType,
                InApp = pref.InApp,
                Email = pref.Email,
                Push = pref.Push
            };
        }
    }
}
