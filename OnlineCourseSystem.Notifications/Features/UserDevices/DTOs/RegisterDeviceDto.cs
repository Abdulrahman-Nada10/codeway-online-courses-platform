namespace OnlineCourseSystem.Notifications.Features.UserDevices.DTOs
{
    public class RegisterDeviceDto
    {
        /// <summary>
        /// Firebase Cloud Messaging (FCM) device token.
        /// </summary>
        public string DeviceToken { get; set; } = null!;

        /// <summary>
        /// Platform type: 0 = Android, 1 = iOS, 2 = Web.
        /// </summary>
        public byte Platform { get; set; }
    }
}
