using OnlineCourseSystem.Auth.DTOs;
using OnlineCourseSystem.Auth.Services;
using GlobalResponse.Shared.Configuration;
using GlobalResponse.Shared.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace OnlineCourseSystem.Auth.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController(LocalizedMessageService messageService, IAuthService authService) : ControllerBase
    {
        private readonly LocalizedMessageService _messageService = messageService;
        private readonly IAuthService _authService = authService;

        private async Task<IActionResult> RegisterWithRole(string roleName, RegisterRequest request, string languageCode)
        {
            var strategy = _authService.GetStrategy(roleName);
            var result = await strategy.RegisterAsync(request, languageCode);

            return result.Success == 1 ? this.OkResponse(result.Success, result.Message)
                : result.Success == -2 ? this.BadRequestResponse<object>(result.Message, 409)
                : this.NotFoundResponse<object>(result.Message);
        }

        [Authorize]
        [HttpPost("admin")]
        public Task<IActionResult> RegisterAdmin([FromBody] RegisterRequest request, [FromHeader] string languageCode = "ar") =>
            RegisterWithRole("Admin", request, languageCode);

        [HttpPost("server")]
        public Task<IActionResult> RegisterServer([FromBody] RegisterRequest request, [FromHeader] string languageCode = "ar") =>
            RegisterWithRole("Server", request, languageCode);

        [HttpPost("member")]
        public Task<IActionResult> RegisterMember([FromBody] RegisterRequest request, [FromHeader] string languageCode = "ar") =>
            RegisterWithRole("Member", request, languageCode);

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request, [FromHeader] string languageCode ="ar")
        {
            try
            {
                var result = await _authService.LoginAsync(request);

                if (result.Success == 0)
                    return this.BadRequestResponse<object>(result.Message!);

                return this.OkResponse(new LoginDto { UserId = result.UserId, AccessToken = result.AccessToken, RefreshToken = result.RefreshToken, RefreshTokenExpiresAt = result.RefreshTokenExpiresAt}, result.Message!);
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] AuthRequestDto request, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var result = await _authService.LogoutAsync(request, languageCode);

                if (result.Success == 0)
                    return this.BadRequestResponse<object>(result.Message!);

                return this.OkResponse(result.Success, result.Message!);
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] AuthRequestDto request, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var result = await _authService.RefreshTokenAsync(request, languageCode);

                if (result.Success == 0)
                    return this.BadRequestResponse<object>(result.Message!);

                return this.OkResponse(new LoginDto { UserId = result.UserId, AccessToken = result.AccessToken, RefreshToken = result.RefreshToken, RefreshTokenExpiresAt = result.RefreshTokenExpiresAt }, result.Message!);
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request, [FromHeader] string languageCode = "ar")
        {
            try
            {
                var result = await _authService.ChangePasswordAsync(request, languageCode);

                if (result.Success == -1)
                    return this.BadRequestResponse<object>(result.Message!);
                
                if (result.Success == 0)
                    return this.NotFoundResponse<object>(result.Message!);

                return this.OkResponse(result.Success, result.Message!);
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest request, [FromHeader] string languageCode = "ar")
        {

            try
            {
                var result = await _authService.UpdateUserAsync(request);
                if (result.Success == -2)
                    return this.UnauthorizedResponse<object>(result.Message!);

                if (result.Success == 0)
                    return this.NotFoundResponse<object>(result.Message!);

                return this.OkResponse(result.Success, result.Message!);
            }
            catch (Exception ex)
            {
                return this.BadRequestResponse<object>($"{await _messageService.GetMessageAsync("SERVER_ERROR", languageCode)}: {ex.Message}");
            }
        }
    }
}
