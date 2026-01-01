namespace OnlineCourseSystem.Auth.DTOs
{
    public class LoginDto
    {
        public long UserId { get; set; }
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime RefreshTokenExpiresAt { get; set; }
    }
}
