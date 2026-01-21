namespace OnlineCourseSystem.Notifications.Models.Enums
{
    /// <summary>
    /// Represents the platform/device type for push notifications.
    /// </summary>
    public enum Platform : byte
    {
        /// <summary>
        /// Android platform.
        /// </summary>
        Android = 0,

        /// <summary>
        /// iOS platform.
        /// </summary>
        iOS = 1,

        /// <summary>
        /// Web platform.
        /// </summary>
        Web = 2
    }
}
