namespace CourseOnline.Auth.Repositories.Interfaces___Copy
{
    public interface ISocialAuthRepository
    {
        (bool Success, string Message, long? UserID) SocialLogin(string provider, string providerUserId, string email, string userName);
    }
}
