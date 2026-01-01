using CourseOnline.Auth.Models.Entities;

namespace CourseOnline.Auth.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
