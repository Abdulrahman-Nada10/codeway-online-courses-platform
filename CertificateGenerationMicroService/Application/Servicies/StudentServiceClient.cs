using CertificateGenerationMicroService.Application.DTO_s;
using CertificateGenerationMicroService.Application.Interfaces;
using System.Text.Json;

namespace CertificateGenerationMicroService.Application.Servicies
{
    public class StudentServiceClient : IStudentServiceClient
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<StudentServiceClient> _logger;

        public StudentServiceClient(HttpClient httpClient, ILogger<StudentServiceClient> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<StudentInfo?> GetStudentByIdAsync(Guid studentId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"/api/students/{studentId}");

                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<StudentInfo>(json, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
                }

                _logger.LogWarning($"Failed to fetch student with ID: {studentId}. Status: {response.StatusCode}");
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching student info: {ex.Message}");
                return null;
            }
        }
    }
}
