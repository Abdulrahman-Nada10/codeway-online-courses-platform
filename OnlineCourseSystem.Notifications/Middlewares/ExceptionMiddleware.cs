using FluentValidation;
using GlobalResponse.Shared.Models;
using OnlineCourseSystem.Notifications.Exceptions;
using System.Net;
using System.Text.Json;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IWebHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, IWebHostEnvironment env)
    {
        _next = next;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidation(context, ex);
        }
        catch (DomainException ex)
        {
            await HandleDomainException(context, ex);
        }
        catch (Exception ex)
        {
            await HandleGeneric(context, ex);
        }
    }

    // =======================
    // Validation (FluentValidation)
    // =======================
    private static Task HandleValidation(HttpContext context, ValidationException exception)
    {
        var errors = exception.Errors
            .GroupBy(e => e.PropertyName)
            .ToDictionary(
                g => g.Key,
                g => g.Select(x => x.ErrorMessage).ToList()
            );

        return WriteResponse(
            context,
            ApiResponse<object>.ErrorResponse(
                "Validation failed",
                errors: errors.SelectMany(x => x.Value).ToList(),
                statusCode: (int)HttpStatusCode.BadRequest
            )
        );
    }

    // =======================
    // Domain Exceptions
    // =======================
    private static Task HandleDomainException(HttpContext context, DomainException exception)
    {
        return exception switch
        {
            NotFoundException =>
                WriteResponse(context,
                    ApiResponse<object>.NotFoundResponse(exception.Message)),

            AlreadyProcessedException or ConflictException =>
                WriteResponse(context,
                    ApiResponse<object>.ErrorResponse(
                        exception.Message,
                        statusCode: (int)HttpStatusCode.Conflict)),

            ResourceExpiredException =>
                WriteResponse(context,
                    ApiResponse<object>.ErrorResponse(
                        exception.Message,
                        statusCode: (int)HttpStatusCode.Gone)),

            AccessDeniedException =>
                WriteResponse(context,
                    ApiResponse<object>.ErrorResponse(
                        exception.Message,
                        statusCode: (int)HttpStatusCode.Forbidden)),

            UnauthorizedException =>
                WriteResponse(context,
                    ApiResponse<object>.ErrorResponse(
                        exception.Message,
                        statusCode: (int)HttpStatusCode.Unauthorized)),

            EmptyCollectionException or BadRequestException =>
                WriteResponse(context,
                    ApiResponse<object>.ErrorResponse(
                        exception.Message,
                        statusCode: (int)HttpStatusCode.BadRequest)),

            OperationFailedException =>
                WriteResponse(context,
                    ApiResponse<object>.ErrorResponse(
                        exception.Message,
                        statusCode: (int)HttpStatusCode.InternalServerError)),

            _ =>
                WriteResponse(context,
                    ApiResponse<object>.ErrorResponse(
                        exception.Message,
                        statusCode: (int)HttpStatusCode.BadRequest))
        };
    }

    // =======================
    // Generic
    // =======================
    private Task HandleGeneric(HttpContext context, Exception ex)
    {
        // show detailed message only in dev
        var message = _env.IsDevelopment()
            ? ex.Message
            : "An unexpected error occurred";

        return WriteResponse(
            context,
            ApiResponse<object>.ErrorResponse(
                message,
                statusCode: (int)HttpStatusCode.InternalServerError
            )
        );
    }

    // =======================
    // Response Writer
    // =======================
    private static Task WriteResponse(HttpContext context, ApiResponse<object> response)
    {
        context.Response.StatusCode = response.StatusCode;
        context.Response.ContentType = "application/json";

        var json = JsonSerializer.Serialize(response);

        return context.Response.WriteAsync(json);
    }
}
