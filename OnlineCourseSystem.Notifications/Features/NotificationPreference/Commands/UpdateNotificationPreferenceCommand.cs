using MediatR;
using OnlineCourseSystem.Notifications.DTOs;

namespace OnlineCourseSystem.Notifications.Features.NotificationPreference.Commands
{
    public class UpdateNotificationPreferenceCommand : IRequest<NotificationPreferenceDto>
    {
        public Guid UserId { get; }
        public UpdateNotificationPreferenceDto Preference { get; }
        public UpdateNotificationPreferenceCommand(Guid userId, UpdateNotificationPreferenceDto preference)
        {
            UserId = userId;
            Preference = preference;
        }
    }
}
