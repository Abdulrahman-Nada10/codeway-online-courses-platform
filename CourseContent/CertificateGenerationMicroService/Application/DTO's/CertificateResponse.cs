namespace CertificateGenerationMicroService.Application.DTO_s
{
    public class CertificateResponse
    {
        public Guid CertificateID { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string CourseName { get; set; } = string.Empty;
        public DateTime IssuedAt { get; set; }
        public string VerificationCode { get; set; } = string.Empty;
        public string? FileURL { get; set; }
    }
}
