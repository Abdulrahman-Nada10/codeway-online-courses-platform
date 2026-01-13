namespace CourseOnline.Auth.DTOs.Social
{
    public class SocialLoginDto
    {
        public string Provider { get; set; }          // Google | Facebook | GitHub
        public string ProviderUserID { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
    }
}
