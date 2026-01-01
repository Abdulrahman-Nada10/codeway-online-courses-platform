using OnlineCourseSystem.Auth.DTOs;

namespace OnlineCourseSystem.Auth.Services
{
    public interface IUserRegistrationStrategy
    {
        Task<AuthResponse> RegisterAsync(RegisterRequest request, string languageCode = "ar");
    }
}
