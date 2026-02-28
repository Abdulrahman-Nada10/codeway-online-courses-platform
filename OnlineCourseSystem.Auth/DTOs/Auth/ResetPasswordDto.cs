namespace OnlineCourseSystem.Auth;

public class ResetPasswordDto
{
    public string Login { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}
