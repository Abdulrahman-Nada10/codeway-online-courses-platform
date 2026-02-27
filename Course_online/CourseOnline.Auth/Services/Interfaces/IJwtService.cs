using CourseOnline.Auth.Models.Entities;
using System.Data;

namespace CourseOnline.Auth.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(long userId, string userName, string email,string role);
    }
}
