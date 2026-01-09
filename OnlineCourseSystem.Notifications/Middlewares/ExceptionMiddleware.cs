using FluentValidation;
using GlobalResponse.Shared.Models;
using OnlineCourseSystem.Notifications.Exceptions;
using System.Net;
using System.Text.Json;
using InvalidDataException = OnlineCourseSystem.Notifications.Exceptions.InvalidDataException;

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
        catch (ValidationException ex)
        {
            await HandleValidation(context, ex);
        }
        catch (DomainException ex)
        {
            await HandleDomainException(context, ex);
        }
        catch (Exception)
        {
            await HandleGeneric(context);
        }
    }

    // =======================
    // Validation (FluentValidation)
    // =======================
    private static Task HandleValidation(
        HttpContext context,
        ValidationException exception)
    {
        var errors = exception.Errors
            .Select(e => e.ErrorMessage)
            .ToList();

        return WriteResponse(
            context,
            ApiResponse<object>.ErrorResponse(
                "Validation failed",
                errors,
                (int)HttpStatusCode.BadRequest
            )
        );
    }

    // =======================
    // Domain Exceptions
    // =======================
    private static Task HandleDomainException(
        HttpContext context,
        DomainException exception)
    {
        return exception switch
        {
            NotFoundException =>
                WriteResponse(context,
                    ApiResponse<object>.NotFoundResponse(exception.Message)),

            AlreadyProcessedException =>
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

            EmptyCollectionException or InvalidDataException =>
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
    private static Task HandleGeneric(HttpContext context)
    {
        return WriteResponse(
            context,
            ApiResponse<object>.ErrorResponse(
                "An unexpected error occurred",
                statusCode: (int)HttpStatusCode.InternalServerError
            )
        );
    }

    // =======================
    // Response Writer
    // =======================
    private static Task WriteResponse(
        HttpContext context,
        ApiResponse<object> response)
    {
        context.Response.StatusCode = response.StatusCode;
        context.Response.ContentType = "application/json";

        return context.Response.WriteAsync(
            JsonSerializer.Serialize(response));
    }
}
