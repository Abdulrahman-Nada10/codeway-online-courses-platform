


using CourseContentMicroService.MicroService.Domain.Entities;

namespace CourseContentMicroService.Domain.Entities
{
    public class Module : BaseEntity<int>
    {
        public Guid CourseId { get; set; }
        public string Title { get; set; }
        public int Order { get; set; }
        
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigational property
        public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();


    }
}
