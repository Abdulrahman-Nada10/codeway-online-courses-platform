using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using online_curess_task.Data;
using online_curess_task.Modle;
using online_curess_task.Repositories.IRepositories;
using System.Data;
using System.Threading.Tasks;

namespace online_curess_task.Utility
{
    public class Dbinitialize: IDbinitialize
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _dbContext;

        public Dbinitialize(IUnitOfWork unitOfWork, ApplicationDbContext dbContext)
        {
            _unitOfWork = unitOfWork;
            _dbContext = dbContext;
        }
        public async Task InitializeAsync()
        {
            try
            {
                //  Apply Migrations
                if ((await _dbContext.Database.GetAppliedMigrationsAsync()).Any())
                {
                    await _dbContext.Database.MigrateAsync();
                }
                // Create Roles
                await CreatRoleExistsAsnync(Roles.Admin);
                await CreatRoleExistsAsnync(Roles.Instructor);
                await CreatRoleExistsAsnync(Roles.Guest);
                await CreatRoleExistsAsnync(Roles.Student);

                /*
                  string[] roles = { role.Guest, role.Student, role.Instructor, role.Admin };

                 foreach (var role in roles)
                 {
                   if (!await _roleManager.RoleExistsAsync(role))
                   {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                   }
                 }


                */

                // Create Super Admin
                await CreatAdmin();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"error:{ex.Message}");
            }
        }
        private async Task CreatRoleExistsAsnync(string roleName)
        {
            if (!await _unitOfWork.RoleManager.RoleExistsAsync(roleName))
            {
                await _unitOfWork.RoleManager.CreateAsync(new IdentityRole(roleName));
            }
        }
        private async Task CreatAdmin()
        {
            var email = "adminonlincurse.com";
            var user = await _unitOfWork.UserManager.FindByEmailAsync(email);

            if (user != null) return;

            user = new ApplicationUser
            {
                UserName = "Admin",
                Email = email,
                FullNam = "Admin",

                EmailConfirmed = true
            };

            var result = await _unitOfWork.UserManager.CreateAsync(user, "Admin123$");

            if (result.Succeeded)
            {
                await _unitOfWork.UserManager.AddToRoleAsync(user, Roles.Admin);
            }
        }

    }
}
