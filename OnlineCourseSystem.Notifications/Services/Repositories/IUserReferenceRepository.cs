namespace OnlineCourseSystem.Notifications.Services.Repositories
{
    public interface IUserReferenceRepository
    {
        Task<bool> AllUsersExistAsync(IEnumerable<Guid> userIds);
        Task<bool> ExistsAsync(Guid userId);
    }
}
