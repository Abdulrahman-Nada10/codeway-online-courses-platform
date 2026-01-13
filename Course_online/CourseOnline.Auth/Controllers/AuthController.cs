using Azure.Messaging;
using CourseOnline.Auth.DTOs;
using CourseOnline.Auth.DTOs.Auth;
using CourseOnline.Auth.DTOs.Social;
using CourseOnline.Auth.DTOs.Social;
using CourseOnline.Auth.Helpers;
using CourseOnline.Auth.Models.Entities;
using CourseOnline.Auth.Repositories.Interfaces;
using CourseOnline.Auth.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Twilio.TwiML.Messaging;
namespace CourseOnline.Auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IJwtService _jwtService;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<AuthController> _logger;
        private readonly ISocialAuthService _socialAuthService;
        public AuthController(IAuthService authService, IJwtService jwtService, IUserRepository _userRepository, ILogger<AuthController> logger, ISocialAuthService socialAuthService)
        {
            _authService = authService;
            _jwtService = jwtService;
            this._userRepository = _userRepository;
            _logger = logger;
            _socialAuthService = socialAuthService;
        }
        [HttpPost("register")]
        public IActionResult Register(RegisterRequestDto dto)
        {
            if (!ModelState.IsValid)
            {
                // جمع كل الرسائل في رسالة واحدة
                var errors = ModelState.Values
                               .SelectMany(v => v.Errors)
                               .Select(e => e.ErrorMessage);

                var message = string.Join("; ", errors);
                return BadRequest(new { message });
            }
            var result = _authService.Register(dto);

            return Ok(result);
        }
        [HttpGet("verify-email")]
        public IActionResult VerifyEmail([FromQuery] string code)
        {
            string result = _authService.VerifyEmail(code);
            return Ok(new { Message = result });
        }

        [HttpPost("verify-phone")]
        public IActionResult VerifyPhone([FromBody] VerifyOtpRequestDto dto)
        {
            string result = _authService.VerifyPhone(dto);
            return Ok(new { Message = result });
        }




        [HttpPost("login")]
        public IActionResult Login(LoginRequestDto dto)
        {
            // نجيب المستخدم عن طريق الإيميل أو الموبايل
            var result = _authService.Login(dto);

            if (!(bool)result.GetType().GetProperty("Success").GetValue(result))
                return Unauthorized(result);
          
            return Ok(result);
        }
        

        [HttpPost("social-login")]
        public IActionResult SocialLogin([FromBody] SocialLoginDto dto)
        {
            try
            {


                var result = _socialAuthService.SocialLogin(dto);
                return Ok(result);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during social login");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
        [HttpGet("login/{provider}")]
        public IActionResult Login(string provider)
        {


            var properties = new AuthenticationProperties
            {
                RedirectUri = "/external-callback"
            };

            return provider.ToLower() switch
            {
                "google" => Challenge(properties, "Google"),
                //"facebook" => Challenge(properties, "Facebook"),
                "github" => Challenge(properties, "GitHub"),
                _ => BadRequest("Provider not supported")
            };
        }


        [HttpGet("external-callback")]
        public async Task<IActionResult> ExternalLoginCallback()
        {
            var authenticateResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            if (!authenticateResult.Succeeded)
                return Unauthorized();

            var claims = authenticateResult.Principal.Identities.First().Claims;
            var provider = authenticateResult.Properties.Items[".AuthScheme"];

            var email = claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                // ممكن نرجع رسالة خطأ للمستخدم
                return BadRequest(new { message = "GitHub account does not have an email public. Please add an email to your GitHub account or use another login method." });
            }

            var name = claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;
            var providerUserIdStr = claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value;

            var dto = new SocialLoginDto
            {
                Provider = provider,
                ProviderUserID = providerUserIdStr,
                Email = email,
                UserName = name
            };

            // 🌟 الربط مع Service
            var result = _socialAuthService.SocialLogin(dto);

            if (!result.Success)
                return BadRequest(new { message = result.Message });

            // توليد JWT
            var token = _jwtService.GenerateToken(result.UserID.Value, dto.UserName, dto.Email);

            return Ok(new
            {
                UserID = result.UserID,
                Token = token,
                Message = result.Message
            });

        }





    }
}



