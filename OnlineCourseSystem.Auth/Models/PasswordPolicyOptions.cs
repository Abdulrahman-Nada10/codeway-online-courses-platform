namespace OnlineCourseSystem.Auth.Models
{
    public class PasswordPolicyOptions
    {
        public bool Enabled { get; set; } = true;
        public int MinimumLength { get; set; } = 8;
        public bool RequireUpper { get; set; } = true;
        public bool RequireLower { get; set; } = true;
        public bool RequireDigit { get; set; } = true;
        public bool RequireSymbol { get; set; } = true;
    }
}
