using CourseContentMicroService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseContentMicroService.Infrastructure.Contexts.Configs
{
    public class QuizConfiguration : IEntityTypeConfiguration<Quiz>
    {
        public void Configure(EntityTypeBuilder<Quiz> builder)
        {
            // Primary Key
            builder.HasKey(q => q.Id);

            // Properties
            builder.Property(q => q.Title)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(q => q.Description)
                .HasMaxLength(1000);

            builder.Property(q => q.TotalMarks)
                .IsRequired()
                .HasPrecision(18, 2); // decimal(18,2)

            builder.Property(q => q.TimeLimitMinutes)
                .IsRequired(false); // Nullable

            builder.Property(q => q.LessonId)
                .IsRequired();

            builder.Property(q => q.CreatedAt)
                .IsRequired();

            builder.Property(q => q.UpdatedAt)
                .IsRequired();

            // Relationship: Quiz belongs to Lesson (many-to-one)
            builder.HasOne(q => q.Lesson)
                .WithMany(l => l.Quizzes)
                .HasForeignKey(q => q.LessonId)
                .OnDelete(DeleteBehavior.Cascade);

            // Relationship: Quiz has many Questions (one-to-many)
            builder.HasMany(q => q.Questions)
                .WithOne(qq => qq.Quiz)
                .HasForeignKey(qq => qq.QuizId)
                .OnDelete(DeleteBehavior.Cascade);

            // Relationship: Quiz has many Submissions (one-to-many)
            builder.HasMany(q => q.Submissions)
                .WithOne(s => s.Quiz)
                .HasForeignKey(s => s.QuizId)
                .OnDelete(DeleteBehavior.Restrict); // Don't delete submissions when quiz is deleted

            // Indexes
            builder.HasIndex(q => q.LessonId);
        }
    }
}
