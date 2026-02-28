using System.ComponentModel.DataAnnotations;

namespace OnlineCourseSystem.Auth;

public class LoginRequestDto
{
    [Required(ErrorMessage = "Email or Phone is required")]
    public string Login { get; set; } = string.Empty;
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; } = string.Empty;
    public bool Success { get; set; }
}
