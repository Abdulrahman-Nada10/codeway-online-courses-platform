using Microsoft.EntityFrameworkCore;
using OnlineCourseSystem.Presentation.Domain.Entities;

namespace OnlineCourseSystem.Presentation.Infrastructure.Contexts
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<PaymentTransaction> PaymentTransactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // TODO: add Fluent API entity configurations here
        }
    }
}
