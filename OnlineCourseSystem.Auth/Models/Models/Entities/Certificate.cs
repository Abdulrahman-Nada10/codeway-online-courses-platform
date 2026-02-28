namespace OnlineCourseSystem.Auth
{
    public class Certificate
    {
        public long CertificateID { get; set; }
        public long StudentID { get; set; }
        public long CourseID { get; set; }
        public DateTime IssuedAt { get; set; }
        public string FileURL { get; set; } = string.Empty;
        public string CourseTitle { get; internal set; } = string.Empty;
    }
}
