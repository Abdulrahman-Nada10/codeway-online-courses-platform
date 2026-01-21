namespace OnlineCourseSystem.Contracts.Messaging.Events;

/// <summary>
/// Base class for all integration events.
/// </summary>
public abstract record IntegrationEvent
{
    /// <summary>
    /// Unique identifier for the event.
    /// </summary>
    public Guid EventId { get; init; } = Guid.NewGuid();

    /// <summary>
    /// UTC timestamp when the event occurred.
    /// </summary>
    public DateTime OccurredAt { get; init; } = DateTime.UtcNow;


    /// <summary>
    /// Optional correlation identifier to trace related operations across services.
    /// </summary>
    public Guid? CorrelationId { get; init; }

    /// <summary>
    /// Optional trace identifier for distributed tracing.
    /// </summary>
    public string? TraceId { get; init; }
}

/// <summary>
/// Generic notification request that any service can publish to ask the Notifications service
/// to create in-app/email/push notifications for a set of users.
/// </summary>
public sealed record NotificationRequestedEvent : IntegrationEvent
{
    public required IReadOnlyCollection<Guid> UserIds { get; init; }

    /// <summary>
    /// Optional course id related to the notification (if applicable).
    /// </summary>
    public Guid? CourseId { get; init; }

    /// <summary>
    /// Business-level notification type (e.g. Course, System, Reminder, Announcement).
    /// This should map to the Notifications service NotificationType enum.
    /// </summary>
    public required string NotificationType { get; init; }

    public required string Title { get; init; }

    public required string Content { get; init; }
}

/// <summary>
/// Raised when a user is successfully enrolled in a course.
/// Notifications service can react and create welcome / enrollment notifications.
/// </summary>
public sealed record UserEnrolledEvent : IntegrationEvent
{
    public required Guid UserId { get; init; }

    public required Guid CourseId { get; init; }

    /// <summary>
    /// Optional course name for descriptive purposes.
    /// </summary>
    public string? CourseName { get; init; }
}

/// <summary>
/// Raised when a payment succeeds (e.g. for purchasing a course or subscription).
/// </summary>
public sealed record PaymentSucceededEvent : IntegrationEvent
{
    public required Guid UserId { get; init; }

    /// <summary>
    /// Optional course id if the payment is for a specific course.
    /// </summary>
    public Guid? CourseId { get; init; }

    /// <summary>
    /// Optional descriptive label for what was purchased (course name, plan, etc.).
    /// </summary>
    public string? Description { get; init; }

    /// <summary>
    /// Currency code in ISO 4217 format (e.g. "EGP", "USD").
    /// </summary>
    public string? Currency { get; init; }

    /// <summary>
    /// Amount paid in minor units (e.g. cents).
    /// </summary>
    public decimal Amount { get; init; }
}