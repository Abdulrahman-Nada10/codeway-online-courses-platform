using CourseMangment.MicroService.Application.DTO_s;
using CourseMangment.MicroService.Domain.Enums;

namespace CourseMangment.MicroService.Application.interfaces
{
    public interface ICourseService
    {

        Task <IEnumerable<CourseDto>> GetAllCoursesAsync();
        Task<CourseDto> GetCourseByIdAsync (Guid id);

        Task<IEnumerable<CourseDto>> GetPublishedCoursesAsync();
        Task<IEnumerable<CourseDto>> GetDraftCoursesAsync();

        Task<CourseDto> CreateAsync(CreateCourseDto createCourseDto);

        Task<CourseDto?> UpdateAsync(Guid id, UpdateCourseDto dto);

        // DELETE operation (Soft delete)
        Task<bool> DeleteAsync(Guid id);

        // Status changes 
        Task<bool> PublishCourseAsync(Guid id);
        Task<bool> UnpublishCourseAsync(Guid id);

        // Additional filters 
        Task<IEnumerable<CourseDto>> GetCoursesByCategoryAsync(int categoryId);
        Task<IEnumerable<CourseDto>> GetCoursesByLevelAsync(CourseLevel level);
        Task<IEnumerable<CourseDto>> GetCoursesByPriceRangeAsync(decimal? minPrice, decimal? maxPrice);
        Task<IEnumerable<CourseDto>> SearchCoursesAsync(string searchTerm);




    }
}
