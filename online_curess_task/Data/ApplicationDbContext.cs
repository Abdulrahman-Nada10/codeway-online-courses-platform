using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using online_curess_task.Modle;

namespace online_curess_task.Data
{
    public class ApplicationDbContext: IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Course> courses { get; set; }
        public DbSet<Lesson> lessons { get; set; }
        public DbSet<Student> students { get; set; }
        public DbSet<ScormStatement> scormStatements { get; set; }
    }
}
