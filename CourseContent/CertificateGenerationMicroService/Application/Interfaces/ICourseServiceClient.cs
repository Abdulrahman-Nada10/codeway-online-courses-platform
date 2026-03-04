using CertificateGenerationMicroService.Application.DTO_s;

namespace CertificateGenerationMicroService.Application.Interfaces
{
    public interface ICourseServiceClient
    {
        Task<CourseInfo?> GetCourseByIdAsync(Guid courseId);
    }
}
