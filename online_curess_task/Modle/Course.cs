using System.ComponentModel.DataAnnotations;

namespace online_curess_task.Modle
{
    public class Course
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public ICollection<ScormStatement> scormStatements { get; set; } = new List<ScormStatement>();
    }
}
