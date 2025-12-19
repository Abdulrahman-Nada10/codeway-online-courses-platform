namespace OnlineCourseSystem.Auth.Services
{
    public interface IJwtService
    {
        string GenerateAccessToken(long userId, string? role = null);
    }
}
