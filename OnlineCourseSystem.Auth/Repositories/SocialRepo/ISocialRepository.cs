namespace OnlineCourseSystem.Auth;

public interface ISocialRepository
{
    (bool Success, string Message, long? UserID) SocialLogin(string provider, string providerUserId, string email, string userName);
}
