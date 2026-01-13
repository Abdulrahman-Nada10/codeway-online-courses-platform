namespace CourseOnline.Auth.DTOs.Auth
{
    public class ResetPasswordDto
    {
        public string Login { get; set; }
        public string Code { get; set; }
        public string NewPassword { get; set; }

    }
}
