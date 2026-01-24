using System.ComponentModel.DataAnnotations;

namespace CourseContentMicroService.Application.DTO_s.Module_DTO_s
{
    public class CreateModuleDto
    {
        public Guid CourseId { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        public int Order { get; set; }
    }
}
