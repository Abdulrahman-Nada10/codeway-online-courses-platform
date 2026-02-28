using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace OnlineCourseSystem.Auth.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController(IAuthService authService, IJwtService jwtService, ILogger<AuthController> logger, ISocialService socialAuthService) : ControllerBase
    {
        private readonly IAuthService _authService = authService;
        private readonly IJwtService _jwtService = jwtService;
        private readonly ILogger<AuthController> _logger = logger;
        private readonly ISocialService _socialAuthService = socialAuthService;

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest dto)
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

            if (!(bool)result.GetType().GetProperty("Success")!.GetValue(result)!)
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
            var provider = authenticateResult.Properties?.Items[".AuthScheme"]
               ?? authenticateResult.Ticket?.AuthenticationScheme;

            var email = claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                _logger.LogWarning("Email not provided by external provider {Provider}", provider);

                return BadRequest(new
                {
                    message = $"{provider} account does not have a public email. Please make your email public or use another login method."
                });
            }

            var name = claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;
            var providerUserIdStr = claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value;

            var dto = new SocialLoginDto
            {
                Provider = provider!,
                ProviderUserID = providerUserIdStr,
                Email = email,
                UserName = name!
            };

            // الربط مع Service
            var result = _socialAuthService.SocialLogin(dto);

            if (!result.Success)
                return BadRequest(new { message = result.Message });

            // توليد JWT
            var token = _jwtService.GenerateToken(result.UserID!.Value, dto.UserName, dto.Email);

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok(new
            {
                UserID = result.UserID,
                Token = token,
                Message = result.Message
            });
        }
    }
}
