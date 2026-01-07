using CourseOnline.Auth.DTOs.Auth;
using CourseOnline.Auth.DTOs.Social;
using CourseOnline.Auth.Repositories.Implementations;
using CourseOnline.Auth.Repositories.Interfaces;
using CourseOnline.Auth.Repositories.Interfaces___Copy;
using CourseOnline.Auth.Services.Interfaces;

namespace CourseOnline.Auth.Services.Implementation
{
    public class SocialAuthService : ISocialAuthService
    {
        public readonly ISocialAuthRepository _socialAuthRepository;
        public SocialAuthService(ISocialAuthRepository socialAuthRepository)
        {
            _socialAuthRepository = socialAuthRepository;
        }

        public (bool Success, string Message, long? UserID) SocialLogin(SocialLoginDto dto)
        {
            return _socialAuthRepository.SocialLogin(
                dto.Provider,
                dto.ProviderUserID,
                dto.Email,
                dto.UserName
            );
        }
    }
    }

