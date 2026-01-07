using CourseOnline.Auth.DTOs;
using CourseOnline.Auth.DTOs.Profile;

namespace CourseOnline.Auth.Services.Interfaces
{
    public interface IProfileService
    {
        ProfileResponseDto GetProfile(long userId);
        ProfileResponseDto UpdateProfile(long userId, UpdateProfileDto dto);
        IEnumerable<EnrolledCourseDto> GetEnrollments(long userId);
        IEnumerable<CertificateDto> GetCertificates(long userId);

    }
}
