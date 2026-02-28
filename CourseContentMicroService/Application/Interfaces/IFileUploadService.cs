using CourseContentMicroService.Application.DTO_s.FileUploadDto;
using CourseContentMicroService.Domain.Entities.Enums;

namespace CourseContentMicroService.Application.Interfaces
{
    public interface IFileUploadService
    {
        Task<FileUploadResponseDto> UploadLessonContentAsync(int lessonId, IFormFile file, LessonType lessonType);
        Task<bool> DeleteFileAsync(string filePath);
        Task<bool> ValidateFileAsync(IFormFile file, LessonType lessonType);
        string GetFileUrl(string fileName);
    }
}
