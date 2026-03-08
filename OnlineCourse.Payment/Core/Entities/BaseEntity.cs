// ============================================================
// BaseEntity.cs - Base class for all entities
// ============================================================
// WHY THIS EXISTS:
//   Every entity needs Id and timestamps.
//   Inherit from this instead of repeating these properties everywhere.

namespace OnlineCourse.Payment.Core.Entities
{
    public class BaseEntity<T>
    {
        public T Id { get; set; } = default!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
