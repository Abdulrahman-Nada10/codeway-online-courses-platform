using CertificateGenerationMicroService.Application.DTO_s;
using CertificateGenerationMicroService.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CertificateGenerationMicroService.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class CertificatesController : ControllerBase
    {
        private readonly ICertificateService _certificateService;
        private readonly ILogger<CertificatesController> _logger;

        public CertificatesController(ICertificateService certificateService, ILogger<CertificatesController> logger)
        {
            _certificateService = certificateService;
            _logger = logger;
        }

        /// <summary>
        /// Create a new certificate for a student completing a course
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<CertificateResponse>> CreateCertificate([FromBody] CreateCertificateRequest request)
        {
            try
            {
                var result = await _certificateService.CreateCertificateAsync(request);
                return CreatedAtAction(nameof(GetCertificate), new { id = result.CertificateID }, result);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning($"Invalid operation: {ex.Message}");
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating certificate: {ex.Message}");
                return StatusCode(500, new { error = "An error occurred while creating the certificate" });
            }
        }

        /// <summary>
        /// Get certificate by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<CertificateResponse>> GetCertificate(Guid id)
        {
            var result = await _certificateService.GetCertificateByIdAsync(id);
            if (result == null)
                return NotFound(new { error = "Certificate not found" });

            return Ok(result);
        }

        /// <summary>
        /// Get certificate by student and course
        /// </summary>
        [HttpGet("student/{studentId}/course/{courseId}")]
        public async Task<ActionResult<CertificateResponse>> GetCertificateByStudentAndCourse(Guid studentId, Guid courseId)
        {
            var result = await _certificateService.GetCertificateByCourseAndStudentAsync(studentId, courseId);
            if (result == null)
                return NotFound(new { error = "Certificate not found for this student and course" });

            return Ok(result);
        }

        /// <summary>
        /// Get certificate by verification code
        /// </summary>
        [HttpGet("verify/{verificationCode}")]
        public async Task<ActionResult<CertificateResponse>> GetCertificateByVerificationCode(string verificationCode)
        {
            var result = await _certificateService.GetCertificateByVerificationCodeAsync(verificationCode);
            if (result == null)
                return NotFound(new { error = "Certificate not found with this verification code" });

            return Ok(result);
        }

        /// <summary>
        /// Download certificate PDF
        /// </summary>
        [HttpGet("{id}/download")]
        public async Task<IActionResult> DownloadCertificate(Guid id)
        {
            try
            {
                var pdfBytes = await _certificateService.GeneratePdfAsync(id);
                return File(pdfBytes, "application/pdf", $"certificate_{id}.pdf");
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning($"Certificate not found: {ex.Message}");
                return NotFound(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error generating PDF: {ex.Message}");
                return StatusCode(500, new { error = "An error occurred while generating the PDF" });
            }
        }

        /// <summary>
        /// Download certificate PDF by verification code
        /// </summary>
        [HttpGet("verify/{verificationCode}/download")]
        public async Task<IActionResult> DownloadCertificateByVerificationCode(string verificationCode)
        {
            try
            {
                var cert = await _certificateService.GetCertificateByVerificationCodeAsync(verificationCode);
                if (cert == null)
                    return NotFound(new { error = "Certificate not found" });

                var pdfBytes = await _certificateService.GeneratePdfAsync(cert.CertificateID);
                return File(pdfBytes, "application/pdf", $"certificate_{verificationCode}.pdf");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error generating PDF: {ex.Message}");
                return StatusCode(500, new { error = "An error occurred while generating the PDF" });
            }
        }
    }
}
