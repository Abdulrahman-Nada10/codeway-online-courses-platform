using OnlineCourseSystem.Auth.DTOs.Role;
using OnlineCourseSystem.Auth.Models;
using OnlineCourseSystem.Auth.Services.Role;
using GlobalResponse.Shared.Configuration;
using GlobalResponse.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace OnlineCourseSystem.Auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController(LocalizedMessageService messageService, IRoleService roleService) : ControllerBase
    {
        private readonly LocalizedMessageService _messageService = messageService;
        private readonly IRoleService _roleService = roleService;

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllRoles([FromHeader] long requestUserId, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var result = await _roleService.GetRolesAsync(requestUserId, languageCode);

                if (result.Success == 0)
                    return this.OkResponse<object>(1, result.Message, 204);
                
                if (result.Success == -1)
                    return this.UnauthorizedResponse<object>(result.Message);

                return this.OkResponse(result.Roles, result.Message);
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpGet("UserRoles/{userId}")]
        public async Task<IActionResult> GetUserRoles([FromHeader] long userId, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var result = await _roleService.GetUserRolesAsync(userId, languageCode);

                if (result.Success == 0)
                    return this.NotFoundResponse<object>(result.Message);

                return this.OkResponse(result.Roles, result.Message);
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRole([FromBody] RoleCreateRequest request, [FromHeader] long requestUserId, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var result = await _roleService.CreateAsync(request, requestUserId, languageCode);

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

        [HttpPost("assign")]
        public async Task<IActionResult> AssignRole([FromBody] AssignRoleRequest req, [FromHeader] long requestUserId, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var result = await _roleService.AssignRoleAsync(requestUserId, req, languageCode);
                if (result.Success == 0)
                    return this.NotFoundResponse<object>(result.Message);
                
                if (result.Success == -1)
                    return this.UnauthorizedResponse<object>(result.Message);

                return this.OkResponse(result.Success, result.Message);
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }

        }

        [HttpDelete("Delete/{roleId:long}")]
        public async Task<IActionResult> DeleteAsync([FromHeader] long requestUserId, long roleId, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var result = await _roleService.DeleteAsync(requestUserId, roleId, languageCode);

                if (result.Success == 0)
                    return this.NotFoundResponse<object>(result.Message);

                if (result.Success == -1)
                    return this.UnauthorizedResponse<object>(result.Message);

                if (result.Success == -2)
                    return this.BadRequestResponse<object>(result.Message, 406);

                return this.OkResponse(result.Success, result.Message);
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }
    }
}
