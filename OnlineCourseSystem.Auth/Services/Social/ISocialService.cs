namespace OnlineCourseSystem.Auth;

public interface ISocialService
{
    (bool Success, string Message, long? UserID) SocialLogin(SocialLoginDto dto);
}
