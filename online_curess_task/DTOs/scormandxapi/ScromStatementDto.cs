namespace online_curess_task.DTOs.scormandxapi
{
    public class ScromStatementDto
    {
        public int StudentID { get; set; }
        public int CourseID { get; set; }
        public int LessonID { get; set; }
        public string Verb { get; set; }
        public string RawJSON { get; set; }
    }
}
