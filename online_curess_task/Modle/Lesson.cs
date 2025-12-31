using System.ComponentModel.DataAnnotations;

namespace online_curess_task.Modle
{
    public class Lesson
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public string? desscription { get; set; }
        public ICollection<ScormStatement> scormStatements { get; set; } = new List<ScormStatement>();
    }
}
