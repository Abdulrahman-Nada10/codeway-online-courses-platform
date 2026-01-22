using CourseContentMicroService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseContentMicroService.Infrastructure.Contexts
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            // Automatic registration - finds ALL IEntityTypeConfiguration<T> classes
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        }

        public DbSet<Module> Modules { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<QuizQuestions> QuizQuestions { get; set; }
        public DbSet<QuizQuestionOptions> QuizQuestionsOptions { get; set; }
        public DbSet<StudentQuizAnswers> StudentQuizAnswers { get; set; }
        public DbSet<StudentQuizSubmission> studentQuizSubmissions { get; set; }



    }
}
