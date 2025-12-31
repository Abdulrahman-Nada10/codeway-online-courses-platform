namespace online_curess_task.DTOs.scormandxapi
{
    public class LessonProgressDto
    {
        public int StudentID { get; set; }
        public int LessonID { get; set; }
        public bool Completed { get; set; }
        public bool Failed { get; set; }
        public bool Started { get; set; }
        public bool Passed { get; set; }
        public double? Score { get; set; }
        public DateTime LastActivity { get; set; }
    }
    public class XApiScore
    {
        public double? scaled { get; set; }
    }

    public class XApiResult
    {
        public XApiScore score { get; set; }
    
    }

    public class XApiStatement
    {
        public XApiResult result { get; set; }
    }
}
