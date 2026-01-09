using Microsoft.AspNetCore.Identity;
using online_curess_task.Data;
using online_curess_task.Modle;
using online_curess_task.Repositories.IRepositories;

namespace online_curess_task.Repositories
{
    public class UnitOfWork: IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext context,
            IScormStatmentRepository scormStatmentRepository,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager) 
        {
            _context = context;
            ScormStatmentRepository = scormStatmentRepository;
            UserManager = userManager;
            RoleManager = roleManager;
        }

        public IScormStatmentRepository ScormStatmentRepository { get; }
        public UserManager<ApplicationUser> UserManager { get; }
        public RoleManager<IdentityRole> RoleManager { get; }

        public void Dispose()
        {
          _context.Dispose();
        }
    }
}
