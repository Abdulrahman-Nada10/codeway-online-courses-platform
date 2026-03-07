using Microsoft.EntityFrameworkCore;
using OnlineCourse.Payment.Core.Entities;

namespace OnlineCourse.Payment.Infrastracture.Persistence
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<PaymentTransaction> PaymentTransactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // TODO: add your Fluent API configurations here
        }
    }
}
