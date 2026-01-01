using OnlineCourseSystem.Auth.DTOs;

namespace OnlineCourseSystem.Auth.Services
{
    public interface IAuthService
    {
        Task<LoginResponse> LoginAsync(LoginRequestDto dto, string languageCode = "ar");
        Task<RefreshTokenResponse> RefreshTokenAsync(AuthRequestDto dto, string languageCode = "ar");
        Task<AuthResponse> LogoutAsync(AuthRequestDto request, string languageCode = "ar");
        Task<AuthResponse> ChangePasswordAsync(ChangePasswordRequest request, string languageCode = "ar");
        Task<AuthResponse> UpdateUserAsync(UpdateUserRequest request, string languageCode = "ar");
        public IUserRegistrationStrategy GetStrategy(string roleName);
    }
}
