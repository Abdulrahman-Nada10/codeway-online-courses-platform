using CourseOnline.Auth.DTOs.Social;

namespace CourseOnline.Auth.Services.Interfaces
{
    public interface ISocialAuthService
    {

        (bool Success, string Message, long? UserID) SocialLogin(SocialLoginDto dto);
    }
}
