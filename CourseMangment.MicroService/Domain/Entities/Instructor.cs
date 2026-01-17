namespace CourseMangment.MicroService.Domain.Entities
{
    public class Instructor: BaseEntity<Guid>
    {
        public string Name { get; set; } 
        public string Bio { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation: كورسات المعلّم
        public ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}
