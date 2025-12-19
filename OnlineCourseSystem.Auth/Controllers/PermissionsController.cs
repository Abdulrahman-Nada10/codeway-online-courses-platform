using OnlineCourseSystem.Auth.Attributes;
using OnlineCourseSystem.Auth.DTOs.Permission;
using OnlineCourseSystem.Auth.Services.Permission;
using GlobalResponse.Shared.Configuration;
using GlobalResponse.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace OnlineCourseSystem.Auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionsController(IPermissionService permissionService, LocalizedMessageService messageService) : ControllerBase
    {
        private readonly IPermissionService _permissionService = permissionService;
        private readonly LocalizedMessageService _messageService = messageService;

        [HttpGet("ByUser/{userID}")]
        public async Task<IActionResult> GetPermissionsByUser([FromHeader] long userID, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var permissions = await _permissionService.GetPermissionsByUserAsync(userID);
                if (permissions == null || !permissions.Any())
                    return this.NotFoundResponse<object>(await _messageService.GetMessageAsync("PERMISSION_NOT_FOUND", languageCode));

                return this.OkResponse(permissions, await _messageService.GetMessageAsync("PERMISSION_LIST_GET", languageCode));
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpGet("CheckUserPermission")]
        public async Task<IActionResult> CheckUserPermission([FromHeader] long userId, string permissionKey, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var hasPermission = await _permissionService.CheckUserPermissionAsync(userId, permissionKey);
                string message = hasPermission == true ? "PERMISSION_HAVE" : "PERMISSION_NOT_HAVE";

                return this.OkResponse(hasPermission, await _messageService.GetMessageAsync(message, languageCode));

            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [Permission("CREATE_PPERMISSION")]
        [HttpGet("All")]
        public async Task<IActionResult> GetPermissions([FromHeader] long requestUserId, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var result = await _permissionService.GetListAsync(requestUserId, languageCode);

                if (result.Success == 0)
                    return this.NotFoundResponse<object>(await _messageService.GetMessageAsync("PERMISSION_NOT_FOUND", languageCode));
                if (result.Success == 1 && (result.Permissions == null || result.Permissions.Count == 0))
                    return this.OkResponse(result.Permissions, await _messageService.GetMessageAsync("NO_CONTENT", languageCode), 204);

                return this.OkResponse(result.Permissions, result.Message);
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreatePermission([FromBody] PermissionCreateDto dto, [FromHeader] long requestUserId, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var result = await _permissionService.CreateAsync(dto, requestUserId, languageCode);

                if (result.Success == 0)
                    return this.OkResponse(result.Success, result.Message, 409);

                if (result.Success == -1)
                    return this.UnauthorizedResponse<object>(result.Message);
                

                return this.OkResponse(result.Success, result.Message, 201);
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpPost("Role/AssignPermission")]
        public async Task<IActionResult> AssignPermission(long roleId, long permissionId, [FromHeader] long requestUserId, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var result = await _permissionService.AssignPermissionAsync(
                    requestUserId, roleId, permissionId, languageCode);

                if (result!.Success == 0)
                    return this.NotFoundResponse<object>(result.Message);

                if (result!.Success == -1)
                    return this.UnauthorizedResponse<object>(result.Message);

                if (result!.Success == -2)
                    return this.OkResponse<object>(result.Success, result.Message, 409);

                return this.OkResponse(result.Success, result.Message);
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpDelete("Remove/{permissionId}")]
        public async Task<IActionResult> RemovePermission(long permissionId, [FromHeader] long requestUserId, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var result = await _permissionService.RemoveAsync(requestUserId, permissionId, languageCode);

                if (result.Success == -1)
                    return this.UnauthorizedResponse<object>(result.Message);
                if (result.Success == 0)
                    return this.NotFoundResponse<object>(result.Message);

                return this.OkResponse<dynamic>(new {success = 1}, result.Message);
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }
    }
}
