using CourseOnline.Auth.Models.Entities;

namespace CourseOnline.Auth.Repositories.Interfaces___Copy
{
    public interface IProfileRepository
    {
        UserProfile GetUserProfile(long userId);
        void UpdateUserProfile(UserProfile profile);
        IEnumerable<Enrollment> GetUserEnrollments(long userId);
        IEnumerable<Certificate> GetUserCertificates(long userId);

    }
}
