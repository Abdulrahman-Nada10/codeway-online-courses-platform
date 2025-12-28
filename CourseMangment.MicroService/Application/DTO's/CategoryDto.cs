// Application/DTOs/CategoryDto.cs
namespace CourseMangment.MicroService.Application.DTO_s
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
