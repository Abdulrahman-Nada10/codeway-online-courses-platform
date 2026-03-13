using System.Net.Http.Headers;
using System.Text.Json;
using OnlineCourse.Payment.Services;

namespace OnlineCourse.Payment.Services
{
    public class CourseManagementService(IHttpClientFactory httpClientFactory) : ICourseManagementService
    {
        public async Task<CourseInfoDto?> GetCourseByIdAsync(Guid courseId, string userToken)
        {
            var client = httpClientFactory.CreateClient("CourseManagement");

            // Forward the user's JWT to CourseManagement
            // WHY: CourseManagement has [Authorize] on all endpoints
            // so without this header it returns 401 Unauthorized
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", userToken);

            var response = await client.GetAsync($"api/Course/{courseId}");

            if (!response.IsSuccessStatusCode)
                return null;

            // CourseManagement wraps response in ApiResponse<T>
            // Source: GlobalResponse.Shared - ApiResponse<CourseDto>.SuccessResponse(...)
            var json = await response.Content.ReadAsStringAsync();

            var wrapper = JsonSerializer.Deserialize<ApiResponseWrapper<CourseInfoDto>>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return wrapper?.Data;
        }
    }

    // Matches GlobalResponse.Shared ApiResponse<T> shape
    // We only need the Data field so we don't need the full class
    internal class ApiResponseWrapper<T>
    {
        public T? Data { get; set; }
    }
}
