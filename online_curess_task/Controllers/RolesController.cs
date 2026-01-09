using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using online_curess_task.DTOs.Roles;
using online_curess_task.Repositories.IRepositories;


namespace online_curess_task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public RolesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpPost("ChangeRoles")]
        public async Task<IActionResult> ChangeRoles([FromBody]ChangeRolesDto changeRolesDto)
        {
            var user = await _unitOfWork.UserManager.FindByIdAsync(changeRolesDto.UserId);
            if (user == null)
                return NotFound("User not found");

            var RoleUser = await _unitOfWork.UserManager.GetRolesAsync(user);
            var addroles = changeRolesDto.AddRoles.Select(e => e.ToString())
                .Distinct().ToList();

            foreach (var item in addroles)
            {
                if (!await _unitOfWork.RoleManager.RoleExistsAsync(item))
                {
                    return BadRequest($"Role '{item}' does not exist");
                }
            }
            if(addroles != null && addroles.Any())
            {
                foreach (var item in RoleUser)
                {
                    await _unitOfWork.UserManager.RemoveFromRoleAsync(user, item);
                }
                foreach (var item in addroles)
                {
                  var result=  await _unitOfWork.UserManager.AddToRoleAsync(user, item);
                    if(!result.Succeeded)
                        return StatusCode(500, result.Errors);
                }
           
            }
            return Ok("User roles updated successfully");
        }

    }
}
