namespace CourseOnline.Auth.Models.Entities
{
    public class Enrollment
    {
        internal readonly string? Course;

        public long EnrollmentID { get; set; }
        public long StudentID { get; set; }
        public long CourseID { get; set; }
        public string CourseTitle { get; set; }


        public DateTime EnrollmentDate { get; set; }
        public int ProgressPercentage { get; set; } = 0;
        public DateTime ExpiryDate { get; set; }
    }
}
