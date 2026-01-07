namespace CourseOnline.Auth.Helpers
{
    public class OtpGenerator
    {
        public static string GenerateOtp(int length)
        {
            var random=new Random();
            string otp = "";
            for (int i = 0; i < length; i++)
            {
                otp += random.Next(0, 10).ToString();

            }
            return otp;
        }
        public static string GenerateEmailOtp()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString(); // 6 أرقام
        }
    }
}
