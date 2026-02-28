using System.ComponentModel.DataAnnotations;

namespace OnlineCourseSystem.Auth;

public class RegisterRequest
{
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string? Email { get; set; }
    [RegularExpression(@"^(\+20|0)1[0125][0-9]{8}$", ErrorMessage = "Phone number must start with 010, 011, 012, 015 and be 11 digits (or +20 country code)")]
    public string? PhoneNumber { get; set; }


    [RegularExpression(
@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$",
ErrorMessage = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
)]
    public string Password { get; set; }
    [Required(ErrorMessage = "Username is required")]
    public string UserName { get; set; }
}
