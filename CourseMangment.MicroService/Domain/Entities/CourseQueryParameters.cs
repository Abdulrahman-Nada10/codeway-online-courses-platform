using CourseMangment.MicroService.Domain.Enums;

namespace CourseMangment.MicroService.Domain.Entities
{
    public class CourseQueryParameters:BaseEntity<Guid>
    {
        public string? Search { get; set; }
        public int? CategoryId { get; set; }
        public CourseLevel? Level { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? SortBy { get; set; }      // "newest", "rating", "enrollments"
        public bool SortDescending { get; set; } = true; // الافتراضي تنازلي

    }
}
