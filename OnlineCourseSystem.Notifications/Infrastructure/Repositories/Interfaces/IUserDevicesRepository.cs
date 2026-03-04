using OnlineCourseSystem.Notifications.Models;

namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces
{
    public interface IUserDevicesRepository
    {
        Task AddDeviceAsync(UserDevice device, CancellationToken cancellationToken = default);
        Task<UserDevice?> DeviceExistForUserAsync(Guid userId, string deviceToken, CancellationToken cancellationToken = default);
    }
}
