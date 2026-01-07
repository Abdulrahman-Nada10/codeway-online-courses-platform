using System.ComponentModel.DataAnnotations;

namespace CourseOnline.Auth.DTOs.Auth
{
    public class RegisterRequestDto
    {
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string ? Email { get; set; }
        [RegularExpression(@"^(\+20|0)1[0125][0-9]{8}$", ErrorMessage = "Phone number must start with 010, 011, 012, 015 and be 11 digits (or +20 country code)")]
        public string? PhoneNumber { get; set; }

      
        [RegularExpression(
    @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$",
    ErrorMessage = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
)]
        public string Password { get; set; }
        [Required(ErrorMessage = "Username is required")]
        public string UserName { get; set; }
        //public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        //{
        //    //  الاتنين فاضي
        //    if (string.IsNullOrWhiteSpace(Email) &&
        //        string.IsNullOrWhiteSpace(PhoneNumber))
        //    {
        //        yield return new ValidationResult(
        //            "Email or Phone is required",
        //            new[] { nameof(Email), nameof(PhoneNumber) }
        //        );
        //    }

        //    //  الاتنين متبعتين
        //    if (!string.IsNullOrWhiteSpace(Email) &&
        //        !string.IsNullOrWhiteSpace(PhoneNumber))
        //    {
        //        yield return new ValidationResult(
        //            "Use either Email or Phone, not both",
        //            new[] { nameof(Email), nameof(PhoneNumber) }
        //        );
        //    }

        //    //  Email بس
        //    if (!string.IsNullOrWhiteSpace(Email))
        //    {
        //        var emailValidator = new EmailAddressAttribute();
        //        if (!emailValidator.IsValid(Email))
        //        {
        //            yield return new ValidationResult(
        //                "Invalid email format",
        //                new[] { nameof(Email) }
        //            );
        //        }
        //    }

        //    // Phone بس
        //    if (!string.IsNullOrWhiteSpace(PhoneNumber))
        //    {
        //        if (!System.Text.RegularExpressions.Regex.IsMatch(
        //            PhoneNumber,
        //            @"^01[0125][0-9]{8}$"))
        //        {
        //            yield return new ValidationResult(
        //                "Invalid phone number",
        //                new[] { nameof(PhoneNumber) }
        //            );
        //        }
        //    }
        }
    }



