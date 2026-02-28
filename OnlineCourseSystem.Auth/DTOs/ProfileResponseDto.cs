namespace OnlineCourseSystem.Auth;

public class ProfileResponseDto
{
    public string UserName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string PhotoUrl { get; set; } = string.Empty;
    public DateTime UpdatedAt { get; set; }
}
