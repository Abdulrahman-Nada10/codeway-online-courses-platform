namespace OnlineCourseSystem.Notifications.Models
{
    public class UserDevice
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string DeviceToken { get; set; } = null!;
        public byte Platform { get; set; } // 0 Android, 1 iOS, 2 Web

        public bool IsActive { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
