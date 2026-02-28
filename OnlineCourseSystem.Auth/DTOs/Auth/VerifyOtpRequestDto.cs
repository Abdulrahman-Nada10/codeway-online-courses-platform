namespace OnlineCourseSystem.Auth;

public class VerifyOtpRequestDto
{
    public long UserID { get; set; }
    public string OtpCode { get; set; } = string.Empty;
    public string OtpType { get; set; } = string.Empty;
}
