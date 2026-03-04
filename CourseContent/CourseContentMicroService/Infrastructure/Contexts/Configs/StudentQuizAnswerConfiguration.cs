using CourseContentMicroService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseContentMicroService.Infrastructure.Contexts.Configs
{
    public class StudentQuizAnswerConfiguration : IEntityTypeConfiguration<StudentQuizAnswers>
    {
        public void Configure(EntityTypeBuilder<StudentQuizAnswers> builder)
        {
            // Primary Key
            builder.HasKey(a => a.Id);

            // Properties
            builder.Property(a => a.SubmissionId)
                .IsRequired();

            builder.Property(a => a.QuestionId)
                .IsRequired();

            builder.Property(a => a.SelectedOptionId)
                .IsRequired(false); // Nullable - only for MCQ

            builder.Property(a => a.AnswerText)
                .HasMaxLength(2000)
                .IsRequired(false); // Nullable - only for Essay

            builder.Property(a => a.Score)
                .IsRequired()
                .HasPrecision(18, 2);

            // Relationship: Answer belongs to Submission (many-to-one)
            builder.HasOne(a => a.Submission)
                .WithMany(s => s.Answers)
                .HasForeignKey(a => a.SubmissionId)
                .OnDelete(DeleteBehavior.Cascade);

            // Relationship: Answer belongs to Question (many-to-one)
            builder.HasOne(a => a.Question)
                .WithMany(qq => qq.StudentAnswers)
                .HasForeignKey(a => a.QuestionId)
                .OnDelete(DeleteBehavior.Restrict);

            // Relationship: Answer belongs to SelectedOption (many-to-one, nullable)
            builder.HasOne(a => a.SelectedOption)
                .WithMany(o => o.StudentAnswers)
                .HasForeignKey(a => a.SelectedOptionId)
                .OnDelete(DeleteBehavior.Restrict);

            // Indexes
            builder.HasIndex(a => a.SubmissionId);
            builder.HasIndex(a => a.QuestionId);
            builder.HasIndex(a => new { a.SubmissionId, a.QuestionId }) // Unique constraint - one answer per question per submission
                .IsUnique();
        }
    }
}
