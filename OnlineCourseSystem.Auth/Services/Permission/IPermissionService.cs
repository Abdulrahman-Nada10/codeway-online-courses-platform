using OnlineCourseSystem.Auth.DTOs.Permission;

namespace OnlineCourseSystem.Auth.Services.Permission
{
    public interface IPermissionService
    {
        Task<PermissionListDto> GetListAsync(long userID, string languageCode);
        Task<List<PermissionByUserDto>> GetPermissionsByUserAsync(long userId);
        Task<PermissionDto?> GetByIdAsync(long id, string languageCode);
        Task<bool> CheckUserPermissionAsync(long userId, string permissionKey);
        Task<PermissionDto> CreateAsync(PermissionCreateDto request, long userId, string languageCode);
        Task<PermissionDto?> UpdateAsync(UpdatePermissionRequest request, long userId, string languageCode);
        Task<PermissionDto> RemoveAsync(long requestUserId, long permissionId, string languageCode);
        Task<PermissionDto?> AssignPermissionAsync(long requestUserId, long roleId, long permissionId, string languageCode);
    }
}
