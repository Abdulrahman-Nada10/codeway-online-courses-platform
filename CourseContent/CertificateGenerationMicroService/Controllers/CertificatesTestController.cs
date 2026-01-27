using CertificateGenerationMicroService.Application.DTO_s;
using CertificateGenerationMicroService.Application.Interfaces;
using CertificateGenerationMicroService.Domain.Entities;
using CertificateGenerationMicroService.Domain.UnitOfWork;
using Microsoft.AspNetCore.Mvc;

namespace CertificateGenerationMicroService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CertificatesTestController : ControllerBase
    {
        private readonly IUOW _unitOfWork;
        private readonly IPdfGenerationService _pdfGenerationService;
        private readonly ILogger<CertificatesTestController> _logger;

        public CertificatesTestController(
            IUOW unitOfWork,
            IPdfGenerationService pdfGenerationService,
            ILogger<CertificatesTestController> logger)
        {
            _unitOfWork = unitOfWork;
            _pdfGenerationService = pdfGenerationService;
            _logger = logger;
        }

        /// <summary>
        /// Test endpoint - Create certificate with mock data (no microservice calls)
        /// </summary>
        [HttpPost("create-test")]
        public async Task<ActionResult<CertificateResponse>> CreateTestCertificate(
            [FromBody] CreateTestCertificateRequest request)
        {
            try
            {
                // Check if certificate already exists
                var existingCerts = await _unitOfWork.GetRepository<Certificate, Guid>().GetAllAsync();
                var existing = existingCerts.FirstOrDefault(c =>
                    c.StudentID == request.StudentID && c.CourseID == request.CourseID);

                if (existing != null)
                {
                    _logger.LogInformation("Certificate already exists");

                    return new CertificateResponse
                    {
                        CertificateID = existing.Id,
                        StudentName = request.StudentName,
                        CourseName = request.CourseName,
                        IssuedAt = existing.IssuedAt,
                        VerificationCode = existing.VerificationCode,
                        FileURL = existing.FileURL
                    };
                }

                // Create certificate with provided test data
                var certificate = new Certificate
                {
                    Id = Guid.NewGuid(),
                    StudentID = request.StudentID,
                    CourseID = request.CourseID,
                    IssuedAt = DateTime.UtcNow,
                    VerificationCode = $"CERT-{Guid.NewGuid().ToString("N").Substring(0, 10).ToUpper()}",
                    CreatedAt = DateTime.UtcNow
                };

                await _unitOfWork.GetRepository<Certificate, Guid>().CreateAsync(certificate);
                await _unitOfWork.SaveChangesAsync();

                _logger.LogInformation($"Test certificate created: {certificate.VerificationCode}");

                return CreatedAtAction(
                    nameof(CertificatesController.GetCertificate),
                    "Certificates",
                    new { id = certificate.Id },
                    new CertificateResponse
                    {
                        CertificateID = certificate.Id,
                        StudentName = request.StudentName,
                        CourseName = request.CourseName,
                        IssuedAt = certificate.IssuedAt,
                        VerificationCode = certificate.VerificationCode,
                        FileURL = certificate.FileURL
                    });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating test certificate: {ex.Message}");
                return StatusCode(500, new { error = "An error occurred while creating the certificate" });
            }
        }

        /// <summary>
        /// Download test certificate PDF by ID
        /// </summary>
        [HttpGet("{id}/download-test")]
        public async Task<IActionResult> DownloadTestCertificate(Guid id, [FromQuery] string studentName = "Test Student", [FromQuery] string courseName = "Test Course")
        {
            try
            {
                var certificates = await _unitOfWork.GetRepository<Certificate, Guid>().GetAllAsync();
                var certificate = certificates.FirstOrDefault(c => c.Id == id);

                if (certificate == null)
                    return NotFound(new { error = "Certificate not found" });

                var certResponse = new CertificateResponse
                {
                    CertificateID = certificate.Id,
                    StudentName = studentName,
                    CourseName = courseName,
                    IssuedAt = certificate.IssuedAt,
                    VerificationCode = certificate.VerificationCode
                };

                var pdfBytes = _pdfGenerationService.GenerateCertificatePdf(certResponse);
                return File(pdfBytes, "application/pdf", $"certificate_{id}.pdf");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error generating PDF: {ex.Message}");
                return StatusCode(500, new { error = "An error occurred while generating the PDF" });
            }
        }
    }

    public class CreateTestCertificateRequest
    {
        public Guid StudentID { get; set; }
        public Guid CourseID { get; set; }
        public string StudentName { get; set; } = "John Doe";
        public string CourseName { get; set; } = "ASP.NET Core Masterclass";
    }
}
