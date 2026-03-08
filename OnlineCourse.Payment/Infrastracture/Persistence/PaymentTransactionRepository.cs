// ============================================================
// PaymentTransactionRepository.cs - Implements IPaymentTransactionRepository
// ============================================================
// WHY THIS EXISTS:
//   Adds PaymentTransaction-specific queries on top of GenericRepository.
//
// TODO: Implement transaction-specific methods:
//   - GetByOrderIdAsync(orderId)
//       -> _context.PaymentTransactions
//              .Where(t => t.OrderId == orderId)
//              .ToListAsync()
//
//   - GetByPaymobTransactionIdAsync(paymobId)
//       -> _context.PaymentTransactions
//              .FirstOrDefaultAsync(t => t.PaymobTransactionId == paymobId)
//       WHY: check if we already processed this Paymob transaction
//            (avoid duplicate processing if Paymob retries the callback)

using OnlineCourse.Payment.Core.Entities;
using OnlineCourse.Payment.Core.Repository;

namespace OnlineCourse.Payment.Infrastracture.Persistence
{
    public class PaymentTransactionRepository(ApplicationDbContext context)
        : GenericRepository<PaymentTransaction>(context), IPaymentTransactionRepository
    {
        // TODO: implement GetByOrderIdAsync
        public Task<IEnumerable<PaymentTransaction>> GetByOrderIdAsync(int orderId)
            => throw new NotImplementedException();

        // TODO: implement GetByPaymobTransactionIdAsync
        public Task<PaymentTransaction?> GetByPaymobTransactionIdAsync(long paymobId)
            => throw new NotImplementedException();
    }
}
