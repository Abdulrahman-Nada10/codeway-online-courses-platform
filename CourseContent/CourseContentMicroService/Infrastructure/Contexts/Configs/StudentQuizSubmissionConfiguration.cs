using CourseContentMicroService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseContentMicroService.Infrastructure.Contexts.Configs
{
    public class StudentQuizSubmissionConfiguration : IEntityTypeConfiguration<StudentQuizSubmission>
    {
        public void Configure(EntityTypeBuilder<StudentQuizSubmission> builder)
        {
            // Primary Key
            builder.HasKey(s => s.Id);

            // Properties
            builder.Property(s => s.QuizId)
                .IsRequired();

            builder.Property(s => s.StudentId)
                .IsRequired();

            builder.Property(s => s.TotalScore)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(s => s.Completed)
                .IsRequired();

            builder.Property(s => s.SubmittedAt)
                .IsRequired(false); // Nullable until submitted

            builder.Property(s => s.CreatedAt)
                .IsRequired(); //bada2 emta 

            // Relationship: Submission belongs to Quiz (many-to-one)
            builder.HasOne(s => s.Quiz)
                .WithMany(q => q.Submissions)
                .HasForeignKey(s => s.QuizId)
                .OnDelete(DeleteBehavior.Restrict);

            // Relationship: Submission has many Answers (one-to-many)
            builder.HasMany(s => s.Answers)
                .WithOne(a => a.Submission)
                .HasForeignKey(a => a.SubmissionId)
                .OnDelete(DeleteBehavior.Cascade); // Delete answers when submission is deleted

            // Indexes
            builder.HasIndex(s => s.QuizId);
            builder.HasIndex(s => s.StudentId);
            builder.HasIndex(s => new { s.QuizId, s.StudentId }); // Composite for finding student's submission
            builder.HasIndex(s => new { s.StudentId, s.Completed }); // For finding incomplete submissions
        }
    }
}
