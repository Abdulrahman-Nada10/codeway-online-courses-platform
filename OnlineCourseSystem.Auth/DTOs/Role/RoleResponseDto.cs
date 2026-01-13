namespace OnlineCourseSystem.Auth.DTOs.Role
{
    public class RoleResponseDto
    {
        public int Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public IEnumerable<RoleDto> Roles { get; set; } = [];
    }
}
