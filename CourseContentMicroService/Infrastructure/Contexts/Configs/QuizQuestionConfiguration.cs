using CourseContentMicroService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseContentMicroService.Infrastructure.Contexts.Configs
{
    public class QuizQuestionConfiguration : IEntityTypeConfiguration<QuizQuestions>
    {
        public void Configure(EntityTypeBuilder<QuizQuestions> builder)
        {
            // Primary Key
            builder.HasKey(qq => qq.Id);

            // Properties
            builder.Property(qq => qq.QuestionText)
                .IsRequired()
                .HasMaxLength(1000);

            builder.Property(qq => qq.QuestionType)
                .IsRequired()
                .HasConversion<int>(); // Store enum as int mohem gedan 

            builder.Property(qq => qq.Marks)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(qq => qq.Order)
                .IsRequired();

            builder.Property(qq => qq.QuizId)
                .IsRequired();

            builder.Property(qq => qq.CreatedAt)
                .IsRequired();

            // Relationship: Question belongs to Quiz (many-to-one)
            builder.HasOne(qq => qq.Quiz)
                .WithMany(q => q.Questions)
                .HasForeignKey(qq => qq.QuizId)
                .OnDelete(DeleteBehavior.Cascade);

            // Relationship: Question has many Options (one-to-many)
            builder.HasMany(qq => qq.Options)
                .WithOne(o => o.QuizQuestions)
                .HasForeignKey(o => o.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            // Relationship: Question has many StudentAnswers (one-to-many)
            builder.HasMany(qq => qq.StudentAnswers)
                .WithOne(sa => sa.Question)
                .HasForeignKey(sa => sa.QuestionId)
                .OnDelete(DeleteBehavior.Restrict); // Don't delete student answers when question is deleted

            // Indexes
            builder.HasIndex(qq => qq.QuizId);
            builder.HasIndex(qq => new { qq.QuizId, qq.Order }); // Composite index for ordering
        }
    }
}
