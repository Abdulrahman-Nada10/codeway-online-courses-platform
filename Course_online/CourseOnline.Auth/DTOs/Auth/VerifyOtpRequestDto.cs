namespace CourseOnline.Auth.DTOs.Auth
{
    public class VerifyOtpRequestDto
    {
        public long UserID { get; set; }
        public string OtpCode { get; set; }
        public string OtpType
        {
            get; set;
        }

    }
}
