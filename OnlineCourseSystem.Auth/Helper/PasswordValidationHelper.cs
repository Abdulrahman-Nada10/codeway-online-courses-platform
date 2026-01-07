using OnlineCourseSystem.Auth.Models;
using Microsoft.Extensions.Options;

namespace OnlineCourseSystem.Auth.Helper
{
    public class PasswordValidationHelper
    {
        private readonly PasswordPolicyOptions _options;

        public PasswordValidationHelper(IOptions<PasswordPolicyOptions> options)
        {
            _options = options.Value;
        }

        public bool Validate(string password, out string error, string languageCode = "ar")
        {
            error = string.Empty;

            if (!_options.Enabled)
                return true;

            if (password.Length < _options.MinimumLength)
            {
                error = languageCode == "ar"
                    ? $"كلمة المرور يجب أن تكون على الأقل {_options.MinimumLength} أحرف"
                    : $"Password must be at least {_options.MinimumLength} characters long.";
                return false;
            }

            if (_options.RequireUpper && !password.Any(char.IsUpper))
            {
                error = languageCode == "ar"
                    ? "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل"
                    : "Password must contain at least one uppercase letter.";
                return false;
            }

            if (_options.RequireLower && !password.Any(char.IsLower))
            {
                error = languageCode == "ar"
                    ? "كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل"
                    : "Password must contain at least one lowercase letter.";
                return false;
            }

            if (_options.RequireDigit && !password.Any(char.IsDigit))
            {
                error = languageCode == "ar"
                    ? "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل"
                    : "Password must contain at least one digit.";
                return false;
            }

            if (_options.RequireSymbol && !password.Any(ch => !char.IsLetterOrDigit(ch)))
            {
                error = languageCode == "ar"
                    ? "كلمة المرور يجب أن تحتوي على رمز واحد على الأقل مثل !@#$%"
                    : "Password must contain at least one symbol (e.g., !@#$%).";
                return false;
            }

            return true;
        }
    }

}
