using MediatR;
using OnlineCourseSystem.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Exceptions;
using OnlineCourseSystem.Notifications.Services.UnitOfWork;

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
                throw new NotFoundException("Notification preference not found for This User.");

            pref.Email = request.Preference.Email;
            pref.Push = request.Preference.Push;

            await _unitOfWork.NotificationPreferences.UpdateAsync(pref);
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
