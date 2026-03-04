using CertificateGenerationMicroService.Application.DTO_s;

namespace CertificateGenerationMicroService.Application.Interfaces
{
    public interface IStudentServiceClient
    {
        Task<StudentInfo?> GetStudentByIdAsync(Guid studentId);
    }
}
