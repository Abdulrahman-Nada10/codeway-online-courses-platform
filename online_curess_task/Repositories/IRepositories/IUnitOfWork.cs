using Microsoft.AspNetCore.Identity;
using online_curess_task.Modle;

namespace online_curess_task.Repositories.IRepositories
{
    public interface IUnitOfWork:IDisposable
    {
        public IScormStatmentRepository ScormStatmentRepository { get; }
        public UserManager<ApplicationUser> UserManager { get; }
        public RoleManager<IdentityRole> RoleManager { get; }
    }
}
