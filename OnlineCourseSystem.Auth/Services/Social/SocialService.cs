namespace OnlineCourseSystem.Auth;

public class SocialService(ISocialRepository socialRepository) : ISocialService
{
    public readonly ISocialRepository _socialRepository = socialRepository;

    public (bool Success, string Message, long? UserID) SocialLogin(SocialLoginDto dto)
    {
        return _socialRepository.SocialLogin(
            dto.Provider,
            dto.ProviderUserID,
            dto.Email,
            dto.UserName
        );
    }
}
