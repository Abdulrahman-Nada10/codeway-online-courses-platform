namespace OnlineCourseSystem.Auth.DTOs.Permission
{
    public class PermissionListDto
    {
        public int Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<Permissions> Permissions { get; set; } = [];
    }
    public class Permissions
    {
        public long Id { get; set; }
        public string Title { get; set; } = string.Empty;
    }
}
