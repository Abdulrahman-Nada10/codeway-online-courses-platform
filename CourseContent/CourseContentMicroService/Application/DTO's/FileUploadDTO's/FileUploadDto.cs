namespace CourseContentMicroService.Application.DTO_s.FileUploadDto
{
    public class FileUploadDto
    {
        public int LessonId { get; set; }
        public IFormFile File { get; set; } = null!;
    }

    public class FileUploadResponseDto
    {
        public string FileName { get; set; } = string.Empty;
        public string FileUrl { get; set; } = string.Empty;
        public long FileSizeBytes { get; set; }
        public string ContentType { get; set; } = string.Empty;
    }
}
