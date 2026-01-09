using MediatR;
using OnlineCourseSystem.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Exceptions;
using OnlineCourseSystem.Notifications.Models.Enums;
using OnlineCourseSystem.Notifications.Services.UnitOfWork;

namespace OnlineCourseSystem.Notifications.Features.NotificationPreference.Queries
{
    public class GetNotificationPreferenceQueryHandler : IRequestHandler<GetNotificationPreferenceQuery, List<NotificationPreferenceDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetNotificationPreferenceQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<NotificationPreferenceDto>> Handle(GetNotificationPreferenceQuery request, CancellationToken cancellationToken)
        {
            if (!await _unitOfWork.UserReferences.ExistsAsync(request.UserId))
            {
                throw new NotFoundException("User", request.UserId);
            }

            var prefs = await _unitOfWork.NotificationPreferences.GetByUserIdAsync(request.UserId);

            // Initialize defaults if none exist
            if (!prefs.Any())
            {
                prefs = Enum.GetValues<NotificationType>()
                    .Select(type => new Models.NotificationPreference
                    {
                        Id = Guid.NewGuid(),
                        UserId = request.UserId,
                        NotificationType = type,
                        InApp = true,
                        Email = false,
                        Push = true
                    })
                    .ToList();

                await _unitOfWork.NotificationPreferences.AddRangeAsync(prefs);
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            }

            return prefs.Select(p => new NotificationPreferenceDto
            {
                NotificationType = p.NotificationType,
                InApp = p.InApp,
                Email = p.Email,
                Push = p.Push
            }).ToList();

        }
    }
}
