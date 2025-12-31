using System.ComponentModel.DataAnnotations;

namespace online_curess_task.Modle
{
    public class Student
    {
        public int Id { get; set; }
        [Required]
        public string FristName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        public string? Addriss { get; set; }
        public ICollection<ScormStatement> scormStatements { get; set; } = new List<ScormStatement>();
    }
}
