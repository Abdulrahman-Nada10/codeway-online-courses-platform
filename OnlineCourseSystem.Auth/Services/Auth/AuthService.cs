namespace OnlineCourseSystem.Auth;

public class AuthService(IUserRepository userRepo, ILoginRepository loginRepo, IVerificationRepository verificationRepo, IJwtService jwtService) : IAuthService
{
    private readonly IUserRepository _userRepo = userRepo;
    private readonly ILoginRepository _loginRepo = loginRepo;
    public readonly IVerificationRepository _verificationRepo = verificationRepo;
    private readonly IJwtService _jwtService = jwtService;

    public string Register(RegisterRequest dto)
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
        if (_userRepo.UserExsits(dto.Email, dto.PhoneNumber))
            return "User already exists";
        if (_userRepo.UserExsits(dto.Email, dto.PhoneNumber))
        {

            // لو الإيميل موجود
            if (!string.IsNullOrEmpty(dto.Email) &&
                _userRepo.GetUserByEmailOrPhone(dto.Email, null) != null)
            {
                return "Email already exists";
            }

            // لو رقم الموبايل موجود
            if (!string.IsNullOrEmpty(dto.PhoneNumber) &&
                _userRepo.GetUserByEmailOrPhone(null, dto.PhoneNumber) != null)
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
        long userId = _userRepo.CreateUser(user);

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
        var user = _loginRepo.GetbyLogin(dto.Login);

        if (user == null)
            //return "User not found";

            return new
            {
                Success = false,
                Message = "User not found"
            };


        //  التحقق من التفعيل
        List<string> notVerified = new List<string>();

        if (!string.IsNullOrEmpty(user.Email) && !user.IsEmailVerified)
            notVerified.Add("Email");

        if (!string.IsNullOrEmpty(user.PhoneNumber) && !user.IsPhoneVerified)
            notVerified.Add("Phone");

        if (notVerified.Any())
            //return $"Account not verified. Please verify your {string.Join(" and ", notVerified)}.";
            return new
            {
                Success = false,
                Message = $"Account not verified. Please verify your {string.Join(" and ", notVerified)}."
            };

        if (user.IsLocked && user.LockoutEnd > DateTime.Now)
            //return $"Account locked until {user.LockoutEnd}";
            return new
            {
                Success = false,
                Message = $"Account locked until {user.LockoutEnd}"
            };
        if (string.IsNullOrEmpty(user.PasswordHash) || string.IsNullOrEmpty(user.PasswordSalt))
        {
            //return "This account uses social login";
            return new
            {
                Success = false,
                Message = "This account uses social login"
            };
        }
        if (string.IsNullOrEmpty(user.PasswordHash) || string.IsNullOrEmpty(user.PasswordSalt))
        {
            //return "Password not set for this user";
            return new
            {
                Success = false,
                Message = "Password not set for this user"
            };
        }
        if (string.IsNullOrEmpty(user.PasswordHash) || string.IsNullOrEmpty(user.PasswordSalt))
        {
            //return  "This account uses social login" ;
            return new
            {
                Success = false,
                Message = "This account uses social login"
            };
        }
        // التحقق من الباسورد
        bool passwordCorrect = PasswordHasher.VerifyPassword(dto.Password, user.PasswordHash, user.PasswordSalt);


        if (!passwordCorrect)
        {
            _loginRepo.UpdateLoginFailure(user.UserID);
            //return "Invalid password";
            return new
            {
                Success = false,
                Message = "Invalid password"
            };
        }

        var token = _jwtService.GenerateToken(user.UserID, user.UserName, user.Email!);

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
            _verificationRepo.SaveEmailVerification(userId, code, DateTime.Now.AddMinutes(10));
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
            _verificationRepo.SavePhoneOtp(userId, Otp, expiry);
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
        bool ok = _verificationRepo.VerifyEmail(code);
        return ok ? "Email verified" : "Invalid or expired code";
    }

    public string VerifyPhone(VerifyOtpRequestDto dto)
    {
        bool ok = _verificationRepo.VerifyPhone(dto.UserID, dto.OtpCode);
        return ok ? "Phone verified" : "Invalid or expired OTP";
    }

    public string ForgotPassword(string login)
    {
        var user = _loginRepo.GetbyLogin(login);

        if (user == null)
            return "User not found";

        string code = OtpGenerator.GenerateEmailOtp();

        _verificationRepo.SaveResetPasswordCode(
            user.UserID,
            code,
            DateTime.Now.AddMinutes(15)
        );

        string body = $"Your reset password code is: {code}";
        EmailSender.SendEmail(user.Email, "Reset Password Code", body);

        return "Reset code sent";
    }

    public string ResetPassword(ResetPasswordDto dto)
    {
        var user = _loginRepo.GetbyLogin(dto.Login);

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

        _verificationRepo.UpdatePassword(
            user.UserID,
            newHash,
            newSalt
        );

        return "Password updated successfully";
    }
}
