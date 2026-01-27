using CertificateGenerationMicroService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CertificateGenerationMicroService.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Certificate> Certificates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Certificate>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.VerificationCode).IsRequired().HasMaxLength(100);
                entity.Property(e => e.FileURL).IsRequired(false).HasMaxLength(500);

                // Unique index on verification code
                entity.HasIndex(e => e.VerificationCode).IsUnique();

                // Composite index for student-course lookup
                entity.HasIndex(e => new { e.StudentID, e.CourseID });
            });
        }
    }
}
