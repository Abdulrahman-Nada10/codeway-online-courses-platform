using CourseContentMicroService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseContentMicroService.Infrastructure.Contexts.Configs
{
    public class QuizQuestionOptionConfiguration : IEntityTypeConfiguration<QuizQuestionOptions>
    {
        public void Configure(EntityTypeBuilder<QuizQuestionOptions> builder)
        {
            // Primary Key
            builder.HasKey(o => o.Id);

            // Properties
            builder.Property(o => o.OptionText)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(o => o.IsCorrect)
                .IsRequired();

            builder.Property(o => o.QuestionId)
                .IsRequired();

            // Relationship: Option belongs to Question (many-to-one)
            builder.HasOne(o => o.QuizQuestions)
                .WithMany(qq => qq.Options)
                .HasForeignKey(o => o.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            // Relationship: Option has many StudentAnswers (one-to-many)
            builder.HasMany(o => o.StudentAnswers)
                .WithOne(sa => sa.SelectedOption)
                .HasForeignKey(sa => sa.SelectedOptionId)
                .OnDelete(DeleteBehavior.Restrict); // Don't delete student answers when option is deleted

            // Indexes
            builder.HasIndex(o => o.QuestionId);
            builder.HasIndex(o => new { o.QuestionId, o.IsCorrect }); // For finding correct answers
        }
    }
}
