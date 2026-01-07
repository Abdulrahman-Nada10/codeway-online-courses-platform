using OnlineCourseSystem.Auth.Helper;
using OnlineCourseSystem.Auth.Infrastructure;
using OnlineCourseSystem.Auth.Models;

namespace OnlineCourseSystem.Auth.Services
{
    public class AdminRegistrationStrategy : UserRegistrationStrategy
    {
        public AdminRegistrationStrategy(string connectionString, PasswordValidationHelper passwordValidator, IPepperProvider pepper)
        : base(connectionString, passwordValidator, pepper) { }
        protected override string RoleName => "Admin";
        protected override bool IsActiveDefault => false;
    }
}
