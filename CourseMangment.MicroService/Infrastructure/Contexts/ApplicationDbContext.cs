using CourseMangment.MicroService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseMangment.MicroService.Infrastructure.Contexts
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        //cofiguration of the model can be done here using fluent API if needed
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Automatic registration - finds ALL IEntityTypeConfiguration<T> classes
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        }
        //Entities 
        public DbSet<Course> Courses { get; set; }
        public DbSet<Category> Categories { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DbSet<CourseQueryParameters> CourseQueryParameters { get; set; }


        }
}
