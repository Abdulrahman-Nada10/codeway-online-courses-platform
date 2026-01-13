namespace CourseOnline.Auth.Repositories.Interfaces
{
    public interface IUserVerificationRepository
    {
        void SaveEmailVerification(long UserID, string Code, DateTime expiry);
        void SavePhoneOtp (long UserID, string Otp, DateTime expiry);
        bool VerifyEmail(string code);
        bool VerifyPhone(long userId, string otp);

        void SaveResetPasswordCode(long userId, string code, DateTime expiry);
        
        void UpdatePassword(long userId, string hash, string salt);
    }
}
