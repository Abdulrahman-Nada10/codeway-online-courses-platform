using online_curess_task.Modle.Enums;

using System.ComponentModel.DataAnnotations;

namespace online_curess_task.DTOs.Roles
{
    public class ChangeRolesDto
    {
        public string UserId {  get; set; }

        [Required]
        public List<RolesUser> AddRoles { get; set; } = new();
    }
}
