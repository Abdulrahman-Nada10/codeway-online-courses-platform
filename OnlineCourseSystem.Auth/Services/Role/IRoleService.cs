namespace OnlineCourseSystem.Auth
{
    public interface IRoleService
    {
        List<User> GetAllUsers();
        User GetUserById(long userId);
        void UpdateRole(long userId, string role);
    }
}
