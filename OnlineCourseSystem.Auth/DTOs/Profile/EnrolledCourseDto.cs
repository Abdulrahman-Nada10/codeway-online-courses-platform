namespace OnlineCourseSystem.Auth;

public class EnrolledCourseDto
{
    public long CourseID { get; set; }
    public string Title { get; set; } = string.Empty;
    public int ProgressPercentage { get; set; }                 // نسبة التقدم
    public string Status { get; set; } = string.Empty;          // Draft / Published
}
