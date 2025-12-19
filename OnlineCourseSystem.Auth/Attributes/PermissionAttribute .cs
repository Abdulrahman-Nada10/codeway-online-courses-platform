using OnlineCourseSystem.Auth.Services.Permission;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.IdentityModel.Tokens.Jwt;
using GlobalResponse.Shared.Extensions;
using GlobalResponse.Shared.Configuration;

namespace OnlineCourseSystem.Auth.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class PermissionAttribute(string permissionKey) : Attribute, IAsyncActionFilter
    {
        private readonly string _permissionKey = permissionKey;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var controller = context.Controller as ControllerBase;
            if (controller == null)
            {
                context.Result = new StatusCodeResult(500);
                return;
            }

            var messageService = context.HttpContext.RequestServices.GetRequiredService<LocalizedMessageService>();


            var user = context.HttpContext.User;
            var userID = "";
            if (context.HttpContext.Request.Headers.TryGetValue("RequestUserId", out var headerUserID))
            {
                userID = headerUserID.FirstOrDefault() ?? "";
            }

            var lang = "ar"; // القيمة الافتراضية
            if (context.HttpContext.Request.Headers.TryGetValue("languageCode", out var headerLang))
            {
                lang = headerLang.FirstOrDefault() ?? "ar";
            }
            if (!user.Identity!.IsAuthenticated)
            {
                context.Result = controller.UnauthorizedResponse<object>(await messageService.GetMessageAsync("UNAUTHORIZED", lang));
                return;
            }

            var userIdClaim = user.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

            if (!long.TryParse(userIdClaim, out var userId))
            {
                context.Result = controller.UnauthorizedResponse<object>(await messageService.GetMessageAsync("UNAUTHORIZED", lang));
                return;
            }

            var permissionService = context.HttpContext.RequestServices.GetService<IPermissionService>();
            if (permissionService is not IPermissionService service)
            {
                context.Result = controller.BadRequestResponse<object>(await messageService.GetMessageAsync("UNAUTHORIZED", lang), 500);
                return;
            }

            var hasPermission = await service.CheckUserPermissionAsync(userId, _permissionKey);
            if (!hasPermission)
            {
                context.Result = controller.UnauthorizedResponse<object>(await messageService.GetMessageAsync("UNAUTHORIZED", lang));
                return;
            }

            await next();
        }
    }
}
