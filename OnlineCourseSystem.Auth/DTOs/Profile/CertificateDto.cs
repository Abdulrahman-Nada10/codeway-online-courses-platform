namespace OnlineCourseSystem.Auth;

public class CertificateDto
{
    public long CertificateID { get; set; }
    public string CourseTitle { get; set; } = string.Empty;
    public DateTime IssuedAt { get; set; }
    public string FileURL { get; set; } = string.Empty;
}
