using GlobalResponse.Shared.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GlobalResponse.Shared.Extensions;

public static class ResponseExtensions
{
    public static IActionResult ToActionResult<T>(this ApiResponse<T> response)
    {
        return new ObjectResult(response)
        {
            StatusCode = response.StatusCode
        };
    }

    public static IActionResult ToActionResult<T>(this PagedResponse<T> response)
    {
        return new ObjectResult(response)
        {
            StatusCode = response.StatusCode
        };
    }

    public static ApiResponse<T> WithTraceId<T>(this ApiResponse<T> response, HttpContext httpContext)
    {
        //response.TraceId = httpContext.TraceIdentifier;
        return response;
    }


    public static IActionResult OkResponse<T>(this ControllerBase controller, T data, string message = "Success", int statusCode = 200)
    {
        return ApiResponse<T>.SuccessResponse(data, message, statusCode).ToActionResult();
    }

    public static IActionResult OkPagedResponse<T>(this ControllerBase controller,
        IEnumerable<T> data,
        int totalRecords,
        int pageNumber,
        int pageSize,
        string message = "Success")
    {
        return PagedResponse<T>.SuccessResponse(data, totalRecords, pageNumber, pageSize, message).ToActionResult();
    }

    public static IActionResult BadRequestResponse<T>(this ControllerBase controller, string message, int statusCode = 400, List<string>? errors = null)
    {
        return ApiResponse<T>.ErrorResponse(message, errors, statusCode).ToActionResult();
    }

    public static IActionResult NotFoundResponse<T>(this ControllerBase controller, string message = "Resource not found")
    {
        return ApiResponse<T>.NotFoundResponse(message).ToActionResult();
    }

    public static IActionResult UnauthorizedResponse<T>(this ControllerBase controller, string message = "Unauthorized")
    {
        return ApiResponse<T>.UnauthorizedResponse(message).ToActionResult();
    }
}
