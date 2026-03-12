using Microsoft.EntityFrameworkCore;
using OnlineCourse.Payment.Entities;

namespace OnlineCourse.Payment.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<PaymentTransaction> PaymentTransactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Order>(e =>
            {
                e.Property(o => o.TotalAmount).HasColumnType("decimal(18,2)");
                e.Property(o => o.UserId).IsRequired().HasMaxLength(450);
            });

            modelBuilder.Entity<OrderItem>(e =>
            {
                e.Property(o => o.Price).HasColumnType("decimal(18,2)");
            });

            modelBuilder.Entity<PaymentTransaction>(e =>
            {
                e.Property(t => t.Amount).HasColumnType("decimal(18,2)");
                e.HasIndex(t => t.PaymobTransactionId).IsUnique();
            });
        }
    }
}
