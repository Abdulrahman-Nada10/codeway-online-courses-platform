namespace OnlineCourseSystem.Auth.DTOs
{
    public class RefreshTokenResponse
    {
        public int Success { get; set; }
        public long UserId { get; set; }
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime RefreshTokenExpiresAt { get; set; }
        public string? Message { get; set; }
    }

}
