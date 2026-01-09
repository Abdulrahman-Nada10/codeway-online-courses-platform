using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata;

namespace online_curess_task.Modle
{
    public class ApplicationUser: IdentityUser
    {
        public string FullNam {  get; set; } = string.Empty;
        public string? Address {  get; set; }
    }
}
