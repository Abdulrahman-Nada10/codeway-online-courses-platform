using MediatR;
using OnlineCourseSystem.Notifications.Exceptions;
using OnlineCourseSystem.Notifications.Features.NotificationPreference.DTOs;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.UnitOfWork;
using OnlineCourseSystem.Notifications.Models.Enums;

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
                prefs = CreateDefaultPreferences(request.UserId);

                await _unitOfWork.NotificationPreferences.AddRangeAsync(prefs, cancellationToken);
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            }

            return prefs
                .OrderBy(x => x.NotificationType)
                .Select(p => new NotificationPreferenceDto
                {
                    NotificationType = p.NotificationType,
                    InApp = p.InApp,
                    Email = p.Email,
                    Push = p.Push
                }).ToList();

        }

        // =========================
        // Helpers
        // =========================
        private static List<Models.NotificationPreference> CreateDefaultPreferences(Guid userId)
        {
            return Enum.GetValues<NotificationType>()
                .Select(type => new Models.NotificationPreference
                {
                    Id = Guid.NewGuid(),
                    UserId = userId,
                    NotificationType = type,
                    InApp = true,
                    Email = false,
                    Push = true
                })
                .ToList();
        }
    }
}
