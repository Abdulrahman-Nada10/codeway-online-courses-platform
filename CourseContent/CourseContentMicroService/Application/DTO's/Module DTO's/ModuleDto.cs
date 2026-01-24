namespace CourseContentMicroService.Application.DTO_s.Module_DTO_s
{
    public class ModuleDto
    {
        public int Id { get; set; }
        public Guid CourseId { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Order { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
