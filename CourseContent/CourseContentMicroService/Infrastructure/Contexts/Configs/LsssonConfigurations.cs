using CourseContentMicroService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseContentMicroService.Infrastructure.Contexts.Configs
{
    public class LsssonConfigurations : IEntityTypeConfiguration<Lesson>
    {
        public void Configure(EntityTypeBuilder<Lesson> builder)
        {
            builder.HasKey(l => l.Id);

            // Properties
            builder.Property(l => l.Title)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(l => l.Content)
                .IsRequired()
                .HasMaxLength(2000); // URLs or text content

            builder.Property(l => l.LessonType)
                .IsRequired()
                .HasConversion<int>(); // Store enum as int

            builder.Property(l => l.Duration)
                .IsRequired();

            builder.Property(l => l.Order)
                .IsRequired();

            builder.Property(l => l.CreatedAt)
                .IsRequired();

            builder.Property(l => l.UpdatedAt)
                .IsRequired();

            builder.Property(l => l.ModuleId)
                .IsRequired();

            // Relationship: Lesson belongs to Module (many-to-one)
            builder.HasOne(l => l.Module)
                .WithMany(m => m.Lessons)
                .HasForeignKey(l => l.ModuleId)
                .OnDelete(DeleteBehavior.Cascade); // Delete lesson when module is deleted

            // Relationship: Lesson has many Quizzes (one-to-many)
            builder.HasMany(l => l.Quizzes)
                .WithOne(q => q.Lesson)
                .HasForeignKey(q => q.LessonId)
                .OnDelete(DeleteBehavior.Cascade); // Delete quizzes when lesson is deleted

            // Indexes for performance
            builder.HasIndex(l => l.ModuleId);
            builder.HasIndex(l => new { l.ModuleId, l.Order }); // Composite index for ordering within module
        }
    }
}
