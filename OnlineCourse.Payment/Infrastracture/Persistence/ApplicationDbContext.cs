// ============================================================
// ApplicationDbContext.cs - EF Core DB context
// ============================================================
// WHY THIS EXISTS:
//   The gateway between C# entities and SQL Server tables.
//   Every entity that needs a DB table must have a DbSet here.
//
// TODO: Add Fluent API configurations in OnModelCreating:
//   - Order.TotalAmount        -> HasColumnType("decimal(18,2)")
//   - Order.UserId             -> IsRequired().HasMaxLength(450)
//   - OrderItem.Price          -> HasColumnType("decimal(18,2)")
//   - PaymentTransaction.Amount -> HasColumnType("decimal(18,2)")
//   - PaymentTransaction.PaymobTransactionId -> HasIndex().IsUnique()
//   - Configure cascade delete for OrderItems and Transactions from Order

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
            // TODO: Add Fluent API configurations here
        }
    }
}
