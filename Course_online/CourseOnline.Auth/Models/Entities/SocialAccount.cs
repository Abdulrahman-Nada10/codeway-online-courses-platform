namespace CourseOnline.Auth.Models.Entities
{
    public class SocialAccount
    {

        public long SocialAccountID { get; set; }
        public long UserID { get; set; }
        public string Provider { get; set; }          // Google | Facebook | GitHub
        public string ProviderUserID { get; set; }
        public string ProviderEmail { get; set; }
        public string ProviderUserName { get; set; }
        public DateTime LinkedAt { get; set; }

    }
}
