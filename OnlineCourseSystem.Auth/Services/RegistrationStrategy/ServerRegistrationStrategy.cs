using OnlineCourseSystem.Auth.Helper;
using OnlineCourseSystem.Auth.Infrastructure;

namespace OnlineCourseSystem.Auth.Services
{
    public class ServerRegistrationStrategy : UserRegistrationStrategy
    {
        public ServerRegistrationStrategy(string connectionString, PasswordValidationHelper passwordValidator, IPepperProvider pepper)
        : base(connectionString, passwordValidator, pepper) { }
        protected override string RoleName => "Server";
        protected override bool IsActiveDefault => false;
    }
}
