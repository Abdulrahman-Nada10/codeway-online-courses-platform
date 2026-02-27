using CourseOnline.Auth.Models.Entities;

namespace CourseOnline.Auth.Services.Interfaces
{
    public interface IRoleService
    {
        List<User> GetAllUsers();
        User GetUserById(long userId);
        void UpdateRole(long userId, string role);
    }
}
