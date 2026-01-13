using CourseOnline.Auth.DTOs.Profile;
using CourseOnline.Auth.Services.Implementation;
using CourseOnline.Auth.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CourseOnline.Auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _service;
        public ProfileController(IProfileService service)
        {
            _service = service;
        }

        private long GetUserIdFromToken()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
                throw new UnauthorizedAccessException("User ID not found in token.");

            return long.Parse(userIdClaim);
        }
       
        [HttpPut]
        public IActionResult UpdateProfile([FromForm] UpdateProfileDto dto)
        {
            var userId = GetUserIdFromToken();
            var updatedProfile = _service.UpdateProfile(userId, dto);
            return Ok(updatedProfile);
        }

       
        [HttpGet("enrollments")]
        public IActionResult GetEnrollments()
        {
            var userId = GetUserIdFromToken();
            var enrollments = _service.GetEnrollments(userId);

            return Ok(new
            {
                message = enrollments.Any() ? "Enrollments retrieved successfully" : "You are not enrolled in any courses yet",
                data = enrollments,
                progress = enrollments.Any() ? enrollments.Average(e => e.ProgressPercentage) : 0
            });
        }

        [HttpGet("certificates")]
        public IActionResult GetCertificates()
        {
            var userId = GetUserIdFromToken();
            var certificates = _service.GetCertificates(userId);

            return Ok(new
            {
                message = certificates.Any() ? "Certificates retrieved successfully" : "You don't have any certificates yet",
                data = certificates
            });
        }
    }
}
        

