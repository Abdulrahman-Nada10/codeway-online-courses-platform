

using CourseOnline.Auth.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseOnline.Auth.Data

{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext>options):base(options) { 
        
        }
        public DbSet<User> Users { get; set; }
    }
}
