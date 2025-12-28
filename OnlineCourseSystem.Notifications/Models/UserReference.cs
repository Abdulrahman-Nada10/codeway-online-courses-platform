namespace OnlineCourseSystem.Notifications.Models
{
    public class UserReference
    {
        public Guid UserId { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}