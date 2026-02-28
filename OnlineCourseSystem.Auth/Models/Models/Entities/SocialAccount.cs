namespace OnlineCourseSystem.Auth
{
    public class SocialAccount
    {
        public long SocialAccountID { get; set; }
        public long UserID { get; set; }
        public string Provider { get; set; } = string.Empty;       // Google | Facebook | GitHub
        public string ProviderUserID { get; set; } = string.Empty;
        public string ProviderEmail { get; set; } = string.Empty;
        public string ProviderUserName { get; set; } = string.Empty;
        public DateTime LinkedAt { get; set; }
    }
}
