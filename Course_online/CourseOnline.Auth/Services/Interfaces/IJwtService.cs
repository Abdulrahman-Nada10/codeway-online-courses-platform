using CourseOnline.Auth.Models.Entities;

namespace CourseOnline.Auth.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(long userId, string userName, string email);
    }
}
