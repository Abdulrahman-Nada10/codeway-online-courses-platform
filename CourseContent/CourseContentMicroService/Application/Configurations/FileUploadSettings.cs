namespace CourseContentMicroService.Application.Configurations
{
    public class FileUploadSettings
    {
        public int MaxVideoFileSizeMB { get; set; } = 2048;  // 2 GB
        public int MaxPdfFileSizeMB { get; set; } = 100;     // 100 MB
        public List<string> AllowedVideoExtensions { get; set; } = new();
        public List<string> AllowedDocumentExtensions { get; set; } = new();
        public string UploadPath { get; set; } = string.Empty;
        public string BaseUrl { get; set; } = string.Empty;
    }
}
