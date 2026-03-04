using CertificateGenerationMicroService.Application.DTO_s;
using CertificateGenerationMicroService.Application.Interfaces;
using System.Text.Json;

namespace CertificateGenerationMicroService.Application.Servicies
{
    public class CourseServiceClient : ICourseServiceClient
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<CourseServiceClient> _logger;

        public CourseServiceClient(HttpClient httpClient, ILogger<CourseServiceClient> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<CourseInfo?> GetCourseByIdAsync(Guid courseId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"/api/courses/{courseId}");

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<CourseInfo>(json, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
                }

                _logger.LogWarning($"Failed to fetch course with ID: {courseId}. Status: {response.StatusCode}");
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching course info: {ex.Message}");
                return null;
            }
        }
    }
}
