using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Notifications.Models;
using OnlineCourseSystem.Notifications.Models.Data;

namespace OnlineCourseSystem.Notifications.Services.Repositories
{
    public class UserReferenceRepository : IUserReferenceRepository
    {
        private readonly NotificationsDbContext _dbContext;

        public UserReferenceRepository(NotificationsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AllUsersExistAsync(IEnumerable<Guid> userIds)
        {
            var distinctUserIds = userIds.Distinct().ToList();

            var existingCount = await _dbContext.UserReferences
                .CountAsync(x => distinctUserIds.Contains(x.UserId));

            return existingCount == distinctUserIds.Count;
        }

        public async Task<bool> ExistsAsync(Guid userId)
        {
            return await _dbContext.UserReferences.AnyAsync(x => x.UserId == userId);
        }
    }
}
