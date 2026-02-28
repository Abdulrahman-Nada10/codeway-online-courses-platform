namespace OnlineCourseSystem.Auth;

public class UpdateProfileDto
{
    public string FullName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public IFormFile ProfileImage { get; set; } = null!;
}
