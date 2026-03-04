using CertificateGenerationMicroService.Application.DTO_s;
using CertificateGenerationMicroService.Application.Interfaces;
using CertificateGenerationMicroService.Domain.Entities;
using CertificateGenerationMicroService.Domain.UnitOfWork;

namespace CertificateGenerationMicroService.Application.Services
{
    public class CertificateService : ICertificateService
    {
        private readonly IUOW _unitOfWork;
        private readonly IStudentServiceClient _studentServiceClient;
        private readonly ICourseServiceClient _courseServiceClient;
        private readonly IPdfGenerationService _pdfGenerationService;
        private readonly ILogger<CertificateService> _logger;

        public CertificateService(
            IUOW unitOfWork,
            IStudentServiceClient studentServiceClient,
            ICourseServiceClient courseServiceClient,
            IPdfGenerationService pdfGenerationService,
            ILogger<CertificateService> logger)
        {
            _unitOfWork = unitOfWork;
            _studentServiceClient = studentServiceClient;
            _courseServiceClient = courseServiceClient;
            _pdfGenerationService = pdfGenerationService;
            _logger = logger;
        }

        private string GenerateVerificationCode()
        {
            return $"CERT-{Guid.NewGuid().ToString("N").Substring(0, 10).ToUpper()}";
        }

        public async Task<CertificateResponse> CreateCertificateAsync(CreateCertificateRequest request)
        {
            // Check if certificate already exists
            var existingCerts = await _unitOfWork.GetRepository<Certificate, Guid>().GetAllAsync();
            var existing = existingCerts.FirstOrDefault(c =>
                c.StudentID == request.StudentID && c.CourseID == request.CourseID);

            if (existing != null)
            {
                _logger.LogInformation($"Certificate already exists for Student {request.StudentID} and Course {request.CourseID}");
                return await GetCertificateByIdAsync(existing.Id)
                    ?? throw new InvalidOperationException("Certificate exists but could not be retrieved");
            }

            // Fetch student and course info from other microservices
            var studentInfo = await _studentServiceClient.GetStudentByIdAsync(request.StudentID);
            var courseInfo = await _courseServiceClient.GetCourseByIdAsync(request.CourseID);

            if (studentInfo == null)
                throw new InvalidOperationException($"Student with ID {request.StudentID} not found");

            if (courseInfo == null)
                throw new InvalidOperationException($"Course with ID {request.CourseID} not found");

            // Create certificate entity
            var certificate = new Certificate
            {
                Id = Guid.NewGuid(),
                StudentID = request.StudentID,
                CourseID = request.CourseID,
                IssuedAt = DateTime.UtcNow,
                VerificationCode = GenerateVerificationCode(),
                CreatedAt = DateTime.UtcNow
            };

            await _unitOfWork.GetRepository<Certificate, Guid>().CreateAsync(certificate);
            await _unitOfWork.SaveChangesAsync();

            _logger.LogInformation($"Certificate created: {certificate.VerificationCode} for student {studentInfo.FullName}");

            return new CertificateResponse
            {
                CertificateID = certificate.Id,
                StudentName = studentInfo.FullName,
                CourseName = courseInfo.Title,
                IssuedAt = certificate.IssuedAt,
                VerificationCode = certificate.VerificationCode,
                FileURL = certificate.FileURL
            };
        }

        public async Task<CertificateResponse?> GetCertificateByIdAsync(Guid certificateId)
        {
            var certificates = await _unitOfWork.GetRepository<Certificate, Guid>().GetAllAsync();
            var certificate = certificates.FirstOrDefault(c => c.Id == certificateId);

            if (certificate == null)
                return null;

            var studentInfo = await _studentServiceClient.GetStudentByIdAsync(certificate.StudentID);
            var courseInfo = await _courseServiceClient.GetCourseByIdAsync(certificate.CourseID);

            return new CertificateResponse
            {
                CertificateID = certificate.Id,
                StudentName = studentInfo?.FullName ?? "Unknown Student",
                CourseName = courseInfo?.Title ?? "Unknown Course",
                IssuedAt = certificate.IssuedAt,
                VerificationCode = certificate.VerificationCode,
                FileURL = certificate.FileURL
            };
        }

        public async Task<CertificateResponse?> GetCertificateByCourseAndStudentAsync(Guid studentId, Guid courseId)
        {
            var certificates = await _unitOfWork.GetRepository<Certificate, Guid>().GetAllAsync();
            var certificate = certificates.FirstOrDefault(c =>
                c.StudentID == studentId && c.CourseID == courseId);

            if (certificate == null)
                return null;

            return await GetCertificateByIdAsync(certificate.Id);
        }

        public async Task<CertificateResponse?> GetCertificateByVerificationCodeAsync(string verificationCode)
        {
            var certificates = await _unitOfWork.GetRepository<Certificate, Guid>().GetAllAsync();
            var certificate = certificates.FirstOrDefault(c =>
                c.VerificationCode == verificationCode);

            if (certificate == null)
                return null;

            return await GetCertificateByIdAsync(certificate.Id);
        }

        public async Task<byte[]> GeneratePdfAsync(Guid certificateId)
        {
            var certificateResponse = await GetCertificateByIdAsync(certificateId);
            if (certificateResponse == null)
                throw new InvalidOperationException($"Certificate with ID {certificateId} not found");

            return _pdfGenerationService.GenerateCertificatePdf(certificateResponse);
        }
    }
}
