namespace online_curess_task.Modle
{
    public class ScormStatement
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int LessonId { get; set; }
        public int StudentId { get; set; }
        public Course Course { get; set; } = null!;
        public Lesson Lesson { get; set; } = null!;
        public Student Student { get; set; } = null!;
      
        public string Verb { get; set; }
        public string RawJSON { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
