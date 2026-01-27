using CertificateGenerationMicroService.Application.DTO_s;

namespace CertificateGenerationMicroService.Application.Interfaces
{
    public interface ICertificateService
    {
        Task<CertificateResponse> CreateCertificateAsync(CreateCertificateRequest request);
        Task<CertificateResponse?> GetCertificateByIdAsync(Guid certificateId);
        Task<CertificateResponse?> GetCertificateByCourseAndStudentAsync(Guid studentId, Guid courseId);
        Task<byte[]> GeneratePdfAsync(Guid certificateId);
        Task<CertificateResponse?> GetCertificateByVerificationCodeAsync(string verificationCode);
    }
}
