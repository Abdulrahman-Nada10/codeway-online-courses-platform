// Application/Services/FileUploadService.cs
using CourseContentMicroService.Application.Configurations;
using CourseContentMicroService.Application.DTO_s.FileUploadDto;
using CourseContentMicroService.Application.DTO_s.LessonsDTO_s;
using CourseContentMicroService.Application.Interfaces;
using CourseContentMicroService.Domain.Entities.Enums;
using Microsoft.Extensions.Options;

namespace CourseContentMicroService.Application.Services
{
    public class FileUploadService : IFileUploadService
    {
        private readonly FileUploadSettings _settings;
        private readonly ILessonService _lessonService;

        public FileUploadService(IOptions<FileUploadSettings> settings, ILessonService lessonService)
        {
            _settings = settings.Value;
            _lessonService = lessonService;
        }

        public async Task<FileUploadResponseDto> UploadLessonContentAsync(int lessonId, IFormFile file, LessonType lessonType)
        {
            // Validate file
            if (!await ValidateFileAsync(file, lessonType))
            {
                throw new ArgumentException("Invalid file type or size");
            }

            // Validate lesson exists
            var lesson = await _lessonService.GetByIdAsync(lessonId);
            if (lesson == null)
            {
                throw new ArgumentException("Lesson not found");
            }

            // Ensure upload directory exists
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), _settings.UploadPath);
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            // Generate unique filename
            var fileExtension = Path.GetExtension(file.FileName);
            var uniqueFileName = $"{lessonId}_{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(uploadPath, uniqueFileName);

            // Save file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Generate file URL
            var fileUrl = GetFileUrl(uniqueFileName);

            // Update lesson content with file URL
            var updateDto = new UpdateLessonDto
            {
                Title = lesson.Title,
                LessonType = lessonType,
                Content = fileUrl,
                Duration = lesson.Duration,
                Order = lesson.Order
            };

            await _lessonService.UpdateAsync(lessonId, updateDto);

            return new FileUploadResponseDto
            {
                FileName = uniqueFileName,
                FileUrl = fileUrl,
                FileSizeBytes = file.Length,
                ContentType = file.ContentType
            };
        }

        public async Task<bool> DeleteFileAsync(string filePath)
        {
            try
            {
                var fullPath = Path.Combine(Directory.GetCurrentDirectory(), _settings.UploadPath, filePath);
                if (File.Exists(fullPath))
                {
                    File.Delete(fullPath);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> ValidateFileAsync(IFormFile file, LessonType lessonType)
        {
            if (file == null || file.Length == 0)
                return false;

            // Determine max size based on file type
            var maxSizeBytes = lessonType switch
            {
                LessonType.video => (long)_settings.MaxVideoFileSizeMB * 1024 * 1024,  // 2 GB
                LessonType.PDF => (long)_settings.MaxPdfFileSizeMB * 1024 * 1024,      // 100 MB
                _ => 0
            };

            if (file.Length > maxSizeBytes)
                return false;

            // Validate file extension
            var fileExtension = Path.GetExtension(file.FileName).ToLower();

            var allowedExtensions = lessonType switch
            {
                LessonType.video => _settings.AllowedVideoExtensions,
                LessonType.PDF => _settings.AllowedDocumentExtensions,
                _ => new List<string>()
            };

            if (!allowedExtensions.Contains(fileExtension))
                return false;

            return true;
        }

        public string GetFileUrl(string fileName)
        {
            return $"{_settings.BaseUrl}/{fileName}";
        }
    }
}
