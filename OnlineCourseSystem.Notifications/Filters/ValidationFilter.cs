using GlobalResponse.Shared.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace OnlineCourseSystem.Notifications.Filters
{
    /// <summary>
    /// An action filter that validates the model state before executing an action.
    /// If the model state is invalid, it returns a standardized error response.
    /// /summary>
    public class ValidationFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var errors = context.ModelState
                    .Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                var response = ApiResponse<object>.ErrorResponse(
                    message: "Validation failed",
                    errors: errors,
                    statusCode: StatusCodes.Status400BadRequest
                );

                context.Result = new ObjectResult(response)
                {
                    StatusCode = response.StatusCode
                };
            }
        }

        public void OnActionExecuted(ActionExecutedContext context) { }
    }
}
