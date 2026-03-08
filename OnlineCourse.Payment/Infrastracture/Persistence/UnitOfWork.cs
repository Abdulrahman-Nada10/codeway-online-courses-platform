// ============================================================
// UnitOfWork.cs - Implements IUOW
// ============================================================
// WHY THIS EXISTS:
//   Wraps all repositories under one SaveChangesAsync() call.
//   This ensures all DB operations in one request are atomic:
//   either ALL succeed or ALL rollback.
//
// USAGE IN OrderService:
//   _uow.Orders.CreateAsync(order);
//   _uow.PaymentTransactions.CreateAsync(transaction);
//   await _uow.SaveChangesAsync();  <- saves both in one transaction

using OnlineCourse.Payment.Core.Repository;
using OnlineCourse.Payment.Core.UnitOfWork;

namespace OnlineCourse.Payment.Infrastracture.Persistence
{
    public class UnitOfWork(ApplicationDbContext context) : IUOW
    {
        // Lazily initialize repositories - only created when accessed
        private IOrderRepository? _orders;
        private IPaymentTransactionRepository? _paymentTransactions;

        public IOrderRepository Orders
            => _orders ??= new OrderRepository(context);

        public IPaymentTransactionRepository PaymentTransactions
            => _paymentTransactions ??= new PaymentTransactionRepository(context);

        // Saves all pending changes to DB in one transaction
        public async Task<int> SaveChangesAsync()
            => await context.SaveChangesAsync();

        public void Dispose()
            => context.Dispose();
    }
}
