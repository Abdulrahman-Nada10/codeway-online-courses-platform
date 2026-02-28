
namespace OnlineCourseSystem.Auth;

public class ProfileService(IProfileRepository repo, FileHelper fileHelper) : IProfileService
{
    private readonly IProfileRepository _repo = repo;
    private readonly FileHelper _fileHelper = fileHelper;

    public IEnumerable<CertificateDto> GetCertificates(long userId)
    {
        return _repo.GetUserCertificates(userId)
                    .Select(c => new CertificateDto
                    {
                        CertificateID = c.CertificateID,
                        CourseTitle = c.CourseTitle,
                        IssuedAt = c.IssuedAt,
                        FileURL = c.FileURL
                    });
    }

    public IEnumerable<EnrolledCourseDto> GetEnrollments(long userId)
    {
        return _repo.GetUserEnrollments(userId)
                    .Select(e => new EnrolledCourseDto
                    {
                        CourseID = e.CourseID,
                        Title = e.CourseTitle,  // ممكن تجيبيها من جدول الكورسات
                        ProgressPercentage = e.ProgressPercentage
                    });
    }

    public ProfileResponseDto GetProfile(long userId)
    {
        var profile = GetProfile(userId);

        return new ProfileResponseDto
        {
            UserName = profile.UserName,
            Bio = profile.Bio,
            PhotoUrl = profile.PhotoUrl,
            UpdatedAt = profile.UpdatedAt
        };
    }

    public ProfileResponseDto UpdateProfile(long userId, UpdateProfileDto dto)
    {
        var profile = _repo.GetUserProfile(userId);

        if (dto.ProfileImage != null)
        {

            _fileHelper.DeleteFile(profile.PhotoUrl);
            profile.PhotoUrl = _fileHelper.UploadFile(dto.ProfileImage);
        }
        profile.UserName = dto.FullName ?? profile.UserName;
        profile.Bio = dto.Bio ?? profile.Bio;
        profile.UpdatedAt = DateTime.Now;

        _repo.UpdateUserProfile(profile);

        return new ProfileResponseDto
        {
            UserName = profile.UserName,
            Bio = profile.Bio,
            PhotoUrl = profile.PhotoUrl,
            UpdatedAt = profile.UpdatedAt
        };
    }
}
