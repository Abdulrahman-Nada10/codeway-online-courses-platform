using CourseOnline.Auth.Models.Entities;
using System.Data;

namespace CourseOnline.Auth.Repositories.Interfaces
{
    public interface IUserRepository
    {

        bool UserExsits(string ?email, string? phone);
        long CreateUser(User user);
        User GetUserByEmailOrPhone(string email, string phoneNumber);
    }
}
