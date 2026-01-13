namespace OnlineCourseSystem.Auth.Models
{
    public class AuthOptions
    {
        public string JwtKey { get; set; } = string.Empty;
        public string JwtIssuer { get; set; } = string.Empty;
        public string JwtAudience { get; set; } = string.Empty;
        public int JwtExpireMinutes { get; set; }
    }
}
