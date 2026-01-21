using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Data;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories
{
    public class UserDevicesRepository : IUserDevicesRepository
    {
        private readonly NotificationsDbContext _context;
        public UserDevicesRepository(NotificationsDbContext context)
        {
            _context = context;
        }

        public async Task AddDeviceAsync(UserDevice device, CancellationToken cancellationToken = default)
        {
            await _context.UserDevices.AddAsync(device, cancellationToken);
        }

        public async Task<UserDevice?> DeviceExistForUserAsync(Guid userId, string deviceToken, CancellationToken cancellationToken = default)
        {
            return await _context.UserDevices
                .FirstOrDefaultAsync(
                    d => d.UserId == userId &&
                         d.DeviceToken == deviceToken,
                    cancellationToken);
        }
    }
}
