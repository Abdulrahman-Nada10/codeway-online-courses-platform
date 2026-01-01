using CourseOnline.Auth.DTOs.Auth;
using CourseOnline.Auth.Repositories.Interfaces;
using CourseOnline.Auth.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CourseOnline.Auth.Helpers;
using CourseOnline.Auth.DTOs;
using Azure.Messaging;
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
        public AuthController(IAuthService authService, IJwtService jwtService, IUserRepository _userRepository, ILogger<AuthController> logger)
        {
            _authService = authService;
            _jwtService = jwtService;
            this._userRepository = _userRepository;
            _logger = logger;
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
            string result =_authService.Login(dto);  // هنا بيشغل الكود اللي بعتيه

            // بناء Response بناءً على النتيجة
            if (result.Contains("not verified"))
                return Unauthorized(new { message = result });

            if (result.Contains("Invalid password") || result.Contains("User not found"))
                return Unauthorized(new { message = result });

            if (result.Contains("locked"))
                return Unauthorized(new { message = result });

            // لو كل حاجة تمام
            return Ok(new { message = result });
        }

        [HttpPost("forgot-password")]
        public IActionResult ForgotPassword(ForgotPasswordDto dto)
        {
            var result = _authService.ForgotPassword(dto.Login);
            return Ok(new { message = result });
        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword(ResetPasswordDto dto)
        {
            var result = _authService.ResetPassword(dto);

            if (result != "Password updated successfully")
                return BadRequest(new { message = result });

            return Ok(new { message = result });
        }


    }





}



