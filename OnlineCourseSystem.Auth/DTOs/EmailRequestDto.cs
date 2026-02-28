namespace OnlineCourseSystem.Auth.DTOs;

public class EmailRequestDto
{
    public long UserId { get; set; }
    public string Email { get; set; } = string.Empty;
}
