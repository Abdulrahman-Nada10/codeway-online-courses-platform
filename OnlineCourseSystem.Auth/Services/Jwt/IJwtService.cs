namespace OnlineCourseSystem.Auth
{
    public interface IJwtService
    {
        string GenerateToken(long userId, string userName, string email);
    }
}
