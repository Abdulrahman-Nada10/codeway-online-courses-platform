namespace OnlineCourseSystem.Auth.DTOs.Permission
{
    public class PermissionCreateDto
    {
        public string PermissionKey { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
