namespace CourseOnline.Auth.DTOs.Profile
{
    public class CertificateDto
    {
        public long CertificateID { get; set; }
        public string CourseTitle { get; set; }
        public DateTime IssuedAt { get; set; }
        public string FileURL { get; set; }
    }
}
