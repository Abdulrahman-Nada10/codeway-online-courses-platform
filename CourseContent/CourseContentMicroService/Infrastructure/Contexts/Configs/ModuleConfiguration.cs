using CourseContentMicroService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseContentMicroService.Infrastructure.Contexts.Configs
{
    public class ModuleConfiguration : IEntityTypeConfiguration<Module>
    {
        public void Configure(EntityTypeBuilder<Module> builder)
        {
            builder.HasKey(m => m.Id);

            builder.Property(m => m.Title)
                .IsRequired()
                .HasMaxLength(200);

            // Configure one-to-many with Lessons
            builder.HasMany(m => m.Lessons)
                .WithOne(l => l.Module)
                .HasForeignKey(l => l.ModuleId)
                .OnDelete(DeleteBehavior.Cascade); // Delete lessons when module is deleted

            // Indexes
            builder.HasIndex(m => m.CourseId);
            builder.HasIndex(m => new { m.CourseId, m.Order }); // Composite index for ordering within course
        }
    }
}
