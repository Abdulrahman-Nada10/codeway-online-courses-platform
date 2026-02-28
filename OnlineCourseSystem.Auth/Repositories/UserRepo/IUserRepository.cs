namespace OnlineCourseSystem.Auth
{
    public interface IUserRepository
    {
        bool UserExsits(string? email, string? phone);
        long CreateUser(User user);
        User GetUserByEmailOrPhone(string email, string phoneNumber);
        List<User> GetAllUsers();
        User GetUserById(long userId);
        void UpdateRole(long userId, string role);
    }
}
