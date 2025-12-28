using OnlineCourseSystem.Notifications.DTOs;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Enums;
using OnlineCourseSystem.Notifications.Services.Repositories;

namespace OnlineCourseSystem.Notifications.Services
{
    public class PreferenceService : IPreferenceService
    {
        private readonly INotificationPreferenceRepository _notificationReferenceRepository;
        private readonly IUserReferenceRepository _userReferenceRepository;

        public PreferenceService(INotificationPreferenceRepository repository, IUserReferenceRepository userReferenceRepository)
        {
            _notificationReferenceRepository = repository;
            _userReferenceRepository = userReferenceRepository;
        }

        public async Task<List<NotificationPreferenceDto>> GetAsync(Guid userId)
        {
            if (!await _userReferenceRepository.ExistsAsync(userId))
            {
                throw new InvalidOperationException("User does not exist.");
            }

            var prefs = await _notificationReferenceRepository.GetByUserIdAsync(userId);

            // Initialize defaults if none exist
            if (!prefs.Any())
            {
                var defaults = Enum.GetValues<NotificationType>()
                    .Select(type => new NotificationPreference
                    {
                        Id = Guid.NewGuid(),
                        UserId = userId,
                        NotificationType = type,
                        InApp = true,
                        Email = false,
                        Push = true
                    })
                    .ToList();

                await _notificationReferenceRepository.AddRangeAsync(defaults);
                prefs = defaults;
            }

            return prefs.Select(p => new NotificationPreferenceDto
            {
                NotificationType = p.NotificationType,
                InApp = p.InApp,
                Email = p.Email,
                Push = p.Push
            }).ToList();
        }

        public async Task UpdateAsync(Guid userId, UpdateNotificationPreferenceDto dto)
        {
            if (!await _userReferenceRepository.ExistsAsync(userId))
            {
                throw new InvalidOperationException("User does not exist.");
            }

            var pref = await _notificationReferenceRepository
                .GetAsync(userId, dto.NotificationType);

            if (pref == null)
                throw new InvalidOperationException("Notification preference not found.");

            pref.Email = dto.Email;
            pref.Push = dto.Push;

            await _notificationReferenceRepository.UpdateAsync(pref);
        }
    }
}
