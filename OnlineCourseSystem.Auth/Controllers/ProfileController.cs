using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace OnlineCourseSystem.Auth.Controllers
{
    [Authorize]
    [Route("api/profile")]
    [ApiController]
    public class ProfileController(IProfileService service) : ControllerBase
    {
        private readonly IProfileService _service = service;

        [HttpPut("me")]

        public IActionResult UpdateProfile(long userId, [FromForm] UpdateProfileDto dto)
        {

            var updatedProfile = _service.UpdateProfile(userId, dto);
            return Ok(updatedProfile);
        }
        [HttpGet("enrollments")]

        public IActionResult GetEnrollments(long userId)
        {
            var enrollments = _service.GetEnrollments(userId);

            return Ok(new
            {
                message = enrollments.Any()
                    ? "Enrollments retrieved successfully"
                    : "You are not enrolled in any courses yet",
                data = enrollments,
                progress = enrollments.Any()
                    ? enrollments.Average(e => e.ProgressPercentage)
                    : 0
            });
        }

        [HttpGet("certificates")]

        public IActionResult GetCertificates(long userId)
        {
            var certificates = _service.GetCertificates(userId);

            return Ok(new
            {
                message = certificates.Any()
                    ? "Certificates retrieved successfully"
                    : "You don't have any certificates yet",
                data = certificates
            });
        }
    }
}
