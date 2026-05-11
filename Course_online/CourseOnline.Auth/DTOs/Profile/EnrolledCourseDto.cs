namespace CourseOnline.Auth.DTOs.Profile
{
    public class EnrolledCourseDto
    {
        public long CourseID { get; set; }
        public string Title { get; set; }
        public int ProgressPercentage { get; set; } // نسبة التقدم
        public string Status { get; set; }          // Draft / Published
    }
}
