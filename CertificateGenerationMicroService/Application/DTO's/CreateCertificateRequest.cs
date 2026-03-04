namespace CertificateGenerationMicroService.Application.DTO_s
{
    public class CreateCertificateRequest
    {
        public Guid StudentID { get; set; }
        public Guid CourseID { get; set; }
    }
}
