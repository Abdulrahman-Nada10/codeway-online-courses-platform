namespace OnlineCourseSystem.Auth;

public class SocialLoginDto
{
    public string Provider { get; set; } = string.Empty;          // Google | Facebook | GitHub
    public string ProviderUserID { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
}
