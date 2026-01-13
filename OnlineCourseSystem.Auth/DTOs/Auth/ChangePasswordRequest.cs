namespace OnlineCourseSystem.Auth.DTOs
{
    public class ChangePasswordRequest
    {
        public long UserId { get; set; }
        public string NewPassword { get; set; } = string.Empty;
        public string OldPassword { get; set; } = string.Empty;
    }
}
