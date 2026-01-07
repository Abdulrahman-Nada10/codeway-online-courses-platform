using CourseOnline.Auth.DTOs.Auth;
using CourseOnline.Auth.Models.Entities;

namespace CourseOnline.Auth.Services.Interfaces
{
    public interface IAuthService
    {
        string Register (RegisterRequestDto dto);
        object Login(LoginRequestDto dto);
   
  
        void SendEmailVerification(long userId, string email);
        void SendPhoneOtp(long userId, string phoneNumber);
        string VerifyEmail(string code);
        string VerifyPhone(VerifyOtpRequestDto dto);
        string ForgotPassword(string login);
        string ResetPassword(ResetPasswordDto dto);

    }
}
