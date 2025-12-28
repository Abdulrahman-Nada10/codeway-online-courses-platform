using GlobalResponse.Shared.Models;

namespace OnlineCourseSystem.Notifications.Middlewares
{
    /// <summary>
    /// Middleware to handle exceptions globally and return standardized error responses.
    /// </summary>
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<object>.ErrorResponse(
                    message: ex.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );

                context.Response.StatusCode = response.StatusCode;
                context.Response.ContentType = "application/json";

                await context.Response.WriteAsJsonAsync(response);
            }
        }
    }
}
