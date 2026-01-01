using OnlineCourseSystem.Auth.DTOs.Role;

namespace OnlineCourseSystem.Auth.Services.Role
{
    public interface IRoleService
    {
        Task<RoleResponseDto> GetRolesAsync(long requestUserId, string languageCode = "ar");
        Task<RoleResponseDto> GetUserRolesAsync(long userId, string languageCode);
        Task<RolesResponseDto> AssignRoleAsync(long requestUserId, AssignRoleRequest req, string languageCode);
        Task<RoleResponseDto> CreateAsync(RoleCreateRequest request, long userId, string languageCode);
        Task<RolesResponseDto> DeleteAsync(long requestUserId, long roleId, string languageCode = "ar");
    }
}
