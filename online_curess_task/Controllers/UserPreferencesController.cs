using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;
using online_curess_task.DTOs.UserPreference;
using online_curess_task.Modle;
using online_curess_task.Repositories.IRepositories;
using System.Security.Claims;


namespace online_curess_task.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserPreferencesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserPreferencesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet("GetUserPreferece")]
        public async Task<IActionResult> GetUserPreferece()
        {

            var user = await _unitOfWork.UserManager.GetUserAsync(User);
            if (user == null)
            {

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (userId == null) return NotFound();
                user = await _unitOfWork.UserManager.FindByIdAsync(userId);

            } 

            var pre =await _unitOfWork.UserPreferenceRepository.GetOneAsync(e => e.ApplicationUserId == user.Id);
            if (pre == null)
            {
                return Ok(new UserPreferenceResponseDto
                {
                    ThemeType = "Light",
                    LangaugeType = "EN"
                });
            }
            return Ok(new UserPreferenceResponseDto
            {
                ThemeType = pre.ThemeType.ToString(),
                LangaugeType = pre.langaugeType.ToString(),
            });
        }
        [HttpPut("UpdateUserPrefernce")]
        public async Task<IActionResult> UpdateUserPrefernce(UserPreferencesDto userPreferencesDto)
        {
            
            var user = await _unitOfWork.UserManager.GetUserAsync(User);
            if (user == null)
            {
               
               var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
               
                if (userId == null) return NotFound();
                user = await _unitOfWork.UserManager.FindByIdAsync(userId);

            }
                
            var pre = await _unitOfWork.UserPreferenceRepository.GetOneAsync(e => e.ApplicationUserId == user.Id);
            if(pre == null)
            {
                pre = new UserPreference
                {
                    ApplicationUserId = user.Id,
                    langaugeType = userPreferencesDto.langaugeType,
                    ThemeType = userPreferencesDto.themeType
                };
                await _unitOfWork.UserPreferenceRepository.CreateAsync(pre);
                 
            }
            else
            {
                pre.langaugeType = userPreferencesDto.langaugeType;
                pre.ThemeType = userPreferencesDto.themeType;
            }
            await _unitOfWork.UserPreferenceRepository.CommitAsync();
            return Created(string.Empty, new { message = "Successful Update User Prefernce" });
        }
    }
}
