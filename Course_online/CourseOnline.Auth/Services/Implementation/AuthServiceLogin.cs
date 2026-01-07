using CourseOnline.Auth.DTOs.Auth;
using CourseOnline.Auth.Repositories.Interfaces;
using CourseOnline.Auth.Services.Interfaces;

namespace CourseOnline.Auth.Services.Implementation
{
    public class AuthServiceLogin
    {
        private readonly IUserRepositoryLogin _userRepo;

        public AuthServiceLogin(IUserRepositoryLogin userRepo)
        {
            _userRepo = userRepo;
        }

    }
}
