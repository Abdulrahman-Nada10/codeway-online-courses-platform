namespace OnlineCourseSystem.Notifications.Infrastructure.Repositories.Interfaces
{
    public interface IUserReferenceRepository
    {
        Task<bool> AllUsersExistAsync(IEnumerable<Guid> userIds);
        Task<bool> ExistsAsync(Guid userId);
    }
}
