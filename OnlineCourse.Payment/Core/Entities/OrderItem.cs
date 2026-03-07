// ============================================================
// OrderItem.cs - One course inside an Order
// ============================================================
// WHY THIS EXISTS:
//   An order can contain multiple courses at once.
//   Each course = one OrderItem row in the database.
//   We snapshot CourseName and Price HERE because:
//     - The course price may change in the future
//     - We need a permanent record of what the user paid for
//
// WHERE COURSE DATA COMES FROM:
//   CourseId is from the CourseManagement microservice.
//   In OrderService, you call CourseManagement HTTP API to get Name + Price.

namespace OnlineCourse.Payment.Core.Entities
{
    public class OrderItem : BaseEntity<int>
    {
        // Foreign key to the parent Order
        public int OrderId { get; set; }

        // The course ID from CourseManagement microservice
        public int CourseId { get; set; }

        // Snapshot of course name AT THE TIME of purchase (not a live reference)
        public string CourseName { get; set; } = string.Empty;

        // Snapshot of price AT THE TIME of purchase
        public decimal Price { get; set; }

        // ── Navigation ────────────────────────────────────────
        public Order Order { get; set; } = null!;
    }
}
