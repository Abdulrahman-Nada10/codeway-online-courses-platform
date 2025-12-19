using OnlineCourseSystem.Auth.Helper;
using OnlineCourseSystem.Auth.Infrastructure;

namespace OnlineCourseSystem.Auth.Services
{
    public class MemberRegistrationStrategy : UserRegistrationStrategy
    {
        public MemberRegistrationStrategy(string connectionString, PasswordValidationHelper passwordValidator, IPepperProvider pepper)
        : base(connectionString, passwordValidator, pepper) { }

        protected override string RoleName => "Member";
        protected override bool IsActiveDefault => false;
    }
}
