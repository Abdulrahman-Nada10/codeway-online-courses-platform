using System.ComponentModel.DataAnnotations;

namespace CourseOnline.Auth.DTOs.Auth
{
    public class LoginRequestDto
    {
        [Required(ErrorMessage = "Email or Phone is required")]
        public string login {get; set;}
        [Required(ErrorMessage = "Password is required")]
        public string Password{ get; set;}
    }
}
