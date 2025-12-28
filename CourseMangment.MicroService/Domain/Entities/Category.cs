namespace CourseMangment.MicroService.Domain.Entities
{
    public class Category:BaseEntity<int>
    {

        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;

         
        // Navigation property
        public ICollection<Course> Courses { get; set; } = new HashSet<Course>();

    }
}
