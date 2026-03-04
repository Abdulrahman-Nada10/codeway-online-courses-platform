using MediatR;
using OnlineCourseSystem.Notifications.Features.NotificationPreference.DTOs;

namespace OnlineCourseSystem.Notifications.Features.NotificationPreference.Queries
{
    public class GetNotificationPreferenceQuery : IRequest<List<NotificationPreferenceDto>>
    {
        public Guid UserId { get; }
        public GetNotificationPreferenceQuery(Guid userId)
        {
            UserId = userId;
        }
    }
}
