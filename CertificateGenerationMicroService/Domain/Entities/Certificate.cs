namespace CertificateGenerationMicroService.Domain.Entities
{
    public class Certificate : BaseEntity<Guid>
    {
        public Guid StudentID { get; set; }
        public Guid CourseID { get; set; }
        public DateTime IssuedAt { get; set; } = DateTime.UtcNow;
        public string VerificationCode { get; set; } = string.Empty;
        public string? FileURL { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
