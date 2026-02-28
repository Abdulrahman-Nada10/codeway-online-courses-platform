namespace OnlineCourseSystem.Auth;

public class SmsRequestDto
{
    public long UserId { get; set; }
    public string PhoneNumber { get; set; } = string.Empty;
}
