namespace CourseOnline.Auth.Models.Entities
{
    public class UserProfile
    {
        public long UserID { get; set; }
        public string UserName { get; set; }
        public string Bio { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

    }
}
