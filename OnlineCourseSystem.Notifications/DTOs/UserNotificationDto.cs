using OnlineCourseSystem.Notifications.Models.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace OnlineCourseSystem.Notifications.DTOs
{
    public class UserNotificationDto
    {
        public Guid NotificationId { get; set; }
        public string Type { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public bool IsRead { get; set; }
        public DateTime? ReadAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid? CourseId { get; set; }
    }

    public class GetUserNotificationsQuery
    {
        [Required]
        public Guid UserId { get; set; }

        /// <summary>
        ///| True => read | False => unread | Null => all notifications |
        /// </summary>
        public bool? IsRead { get; set; }

        /// <summary>
        /// Default value is 1
        /// </summary>
        [DefaultValue(1)]
        public int PageNumber { get; set; } = 1;

        /// <summary>
        /// Default value is 20 - Maximum allowed value is 100
        /// </summary>
        [DefaultValue(20)]
        public int PageSize { get; set; } = 20;
    }

}
