using CourseOnline.Auth.DTOs.Auth;
using CourseOnline.Auth.Helpers;
using CourseOnline.Auth.Models.Entities;
using CourseOnline.Auth.Repositories.Interfaces;
using CourseOnline.Auth.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using OtpNet;
using System.Collections.Generic;

using static System.Net.WebRequestMethods;


namespace CourseOnline.Auth.Services.Implementation
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserRepositoryLogin _userRepo;
        public readonly IUserVerificationRepository _userVerification;
        private readonly IJwtService _jwtService;
        public AuthService(IUserRepository userRepository, IUserRepositoryLogin userRepo, IUserVerificationRepository userVerification, IJwtService jwtService)
        {
            _userRepository = userRepository;
            _userRepo = userRepo;
            _userVerification = userVerification;
            _jwtService = jwtService;
        }
        public string Register(RegisterRequestDto dto)
        {
            // 1️Validation أساسي
            if (string.IsNullOrWhiteSpace(dto.Email) &&
                string.IsNullOrWhiteSpace(dto.PhoneNumber))
                return "Email or Phone is required";

            if (string.IsNullOrWhiteSpace(dto.Password))
                return "Password is required";

            if (string.IsNullOrWhiteSpace(dto.UserName))
                return "Username is required";

            // 2️ Check user exists (صح)
            if (_userRepository.UserExsits(dto.Email, dto.PhoneNumber))
                return "User already exists";
            if (_userRepository.UserExsits(dto.Email, dto.PhoneNumber))
            {

                // لو الإيميل موجود
                if (!string.IsNullOrEmpty(dto.Email) &&
        _userRepository.GetUserByEmailOrPhone(dto.Email, null) != null)
                {
                    return "Email already exists";
                }

                // لو رقم الموبايل موجود
                if (!string.IsNullOrEmpty(dto.PhoneNumber) &&
                    _userRepository.GetUserByEmailOrPhone(null, dto.PhoneNumber) != null)
                {
                    return "Phone number already exists";
                }
            }
            // 3️ Hash + Salt
            PasswordHasher.CreatePasswordHash(
                dto.Password,
                out string passwordHash,
                out string passwordSalt
            );

            // 4️ Create user
            var user = new User
            {
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                UserName = dto.UserName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                IsLocked = false,
                IsEmailVerified = false,
                IsPhoneVerified = false,
                FailedLoginAttempt = 0
            };


            // 5 CREATE USER + GET ID
            long userId = _userRepository.CreateUser(user);

            // 6 SEND ACTIVATION فورًا
            if (!string.IsNullOrEmpty(user.Email))
                SendEmailVerification(userId, user.Email);

            if (!string.IsNullOrEmpty(user.PhoneNumber))
                SendPhoneOtp(userId, user.PhoneNumber);

            // 7️DONE
            return "Registered successfully. Please verify your email or phone.";


        }
        public object Login(LoginRequestDto dto)
        {
            var user = _userRepo.GetbyLogin(dto.login);

            if (user == null)
                return "User not found";



            //  التحقق من التفعيل
            List<string> notVerified = new List<string>();

            if (!string.IsNullOrEmpty(user.Email) && !user.IsEmailVerified)
                notVerified.Add("Email");

            if (!string.IsNullOrEmpty(user.PhoneNumber) && !user.IsPhoneVerified)
                notVerified.Add("Phone");

            if (notVerified.Any())
                return $"Account not verified. Please verify your {string.Join(" and ", notVerified)}.";

            if (user.IsLocked && user.LockoutEnd > DateTime.Now)
                return $"Account locked until {user.LockoutEnd}";
            if (string.IsNullOrEmpty(user.PasswordHash) || string.IsNullOrEmpty(user.PasswordSalt))
            {
                return "This account uses social login";
            }
            if (string.IsNullOrEmpty(user.PasswordHash) || string.IsNullOrEmpty(user.PasswordSalt))
            {
                return "Password not set for this user";
            }
            if (string.IsNullOrEmpty(user.PasswordHash) || string.IsNullOrEmpty(user.PasswordSalt))
            {
                return  "This account uses social login" ;
            }
            // التحقق من الباسورد
            bool passwordCorrect = PasswordHasher.VerifyPassword(dto.Password, user.PasswordHash, user.PasswordSalt);


            if (!passwordCorrect)
            {
                _userRepo.UpdateLoginFailure(user.UserID);
                return "Invalid password";
            }

            var token = _jwtService.GenerateToken(user.UserID, user.UserName, user.Email);

            return new
            {
                Success = true,
                Message = "Login successful",
                UserID = user.UserID,
                Token = token
            };
          
          
        }

        public void SendEmailVerification(long userId, string email)
        {
            try
            {
                // توليد الكود وحفظه
                string code = OtpGenerator.GenerateEmailOtp();





                _userVerification.SaveEmailVerification(userId, code, DateTime.Now.AddMinutes(10));
                string body = $"Your verification code is: {code}";
                EmailSender.SendEmail(email, "Email Verification Code", body);
                // إرسال الإيميل بالكود مباشرة


                Console.WriteLine("Email sent successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Email sending failed: {ex.Message}");
            }
        }

        public void SendPhoneOtp(long userId, string phoneNumber)
        {
            try
            {
                string Otp = OtpGenerator.GenerateOtp(6);
                DateTime expiry = DateTime.Now.AddHours(24);
                _userVerification.SavePhoneOtp(userId, Otp, expiry);




                SmsSender.SendSms(phoneNumber, $"Your OTP code is {Otp}");

                Console.WriteLine("SMS sent successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"SMS sending failed: {ex.Message}");
            }
        }

        public string VerifyEmail(string code)
        {
            bool ok = _userVerification.VerifyEmail(code);
            return ok ? "Email verified" : "Invalid or expired code";
        }

        public string VerifyPhone(VerifyOtpRequestDto dto)
        {
            bool ok = _userVerification.VerifyPhone(dto.UserID, dto.OtpCode);
            return ok ? "Phone verified" : "Invalid or expired OTP";
        }
        public string ForgotPassword(string login)
        {
            
            var user = _userRepo.GetbyLogin(login);

            if (user == null)
                return "User not found";

            string code = OtpGenerator.GenerateEmailOtp();

            _userVerification.SaveResetPasswordCode(
                user.UserID,
                code,
                DateTime.Now.AddMinutes(15)
            );

            string body = $"Your reset password code is: {code}";
            EmailSender.SendEmail(user.Email, "Reset Password Code", body);

            return "Reset code sent";
        }




        // 2️⃣ تعيين باسورد جديد
        public string ResetPassword(ResetPasswordDto dto)
        {
            var user = _userRepo.GetbyLogin(dto.Login);

            if (user == null)
                return "User not found";

            if (user.ResetPasswordCode.Trim() != dto.Code.Trim() ||
                user.ResetPasswordExpiry < DateTime.Now)
            {
                return "Invalid or expired code";
            }

            PasswordHasher.CreatePasswordHash(
                dto.NewPassword,
                out string newHash,
                out string newSalt
            );

            _userVerification.UpdatePassword(
                user.UserID,
                newHash,
                newSalt
            );

            return "Password updated successfully";
        }
    }

    }



