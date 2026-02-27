using CourseOnline.Auth.DTOs;
using CourseOnline.Auth.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CourseOnline.Auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        // جيب كل اليوزرز
        [HttpGet("users")]
        public IActionResult GetAllUsers()
        {
            var users = _roleService.GetAllUsers();
            return Ok(new
            {
                message = "Users retrieved successfully",
                data = users.Select(u => new
                {
                    u.UserID,
                    u.UserName,
                    u.Email,
                    u.Role,
                    u.IsActive,
                    u.IsLocked
                })
            });
        }

        // جيب يوزر معين
        [HttpGet("{userId}")]
        public IActionResult GetUserById(long userId)
        {
            var user = _roleService.GetUserById(userId);
            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(new
            {
                user.UserID,
                user.UserName,
                user.Email,
                user.Role,
                user.IsActive,
                user.IsLocked
            });
        }

        // غير رول يوزر
        [HttpPut("{userId}/role")]
        public IActionResult UpdateRole(long userId, [FromBody] UpdateRoleDto dto)
        {
            // Admin ميغيرش رول نفسه
            var adminId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            if (adminId == userId)
                return BadRequest(new { message = "لا يمكنك تغيير صلاحياتك" });

            // Validation على الـ Role
            var validRoles = new[] { "Admin", "Instructor", "Student" };
            if (!validRoles.Contains(dto.Role))
                return BadRequest(new { message = "Role غير صحيح، الـ Roles المتاحة: Admin, Instructor, Student" });

            // تأكد إن اليوزر موجود
            var user = _roleService.GetUserById(userId);
            if (user == null)
                return NotFound(new { message = "User not found" });

            _roleService.UpdateRole(userId, dto.Role);

            return Ok(new { message = $"تم تغيير صلاحية {user.UserName} إلى {dto.Role} بنجاح" });
        }
    }
}

    