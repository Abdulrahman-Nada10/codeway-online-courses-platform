namespace OnlineCourseSystem.Notifications.Exceptions
{
    /// <summary>
    /// Base exception for domain/business rule violations.
    /// </summary>
    public abstract class DomainException : Exception
    {
        protected DomainException(string message) : base(message) { }

        protected DomainException(string message, Exception? innerException)
            : base(message, innerException) { }
    }

    // =========================
    // 404 Not Found
    // =========================
    public sealed class NotFoundException : DomainException
    {
        public string ResourceName { get; }
        public object? ResourceKey { get; }

        public NotFoundException(string resourceName, object? resourceKey = null)
            : base(resourceKey is null
                ? $"{resourceName} was not found."
                : $"{resourceName} with id '{resourceKey}' was not found.")
        {
            ResourceName = resourceName;
            ResourceKey = resourceKey;
        }
    }

    // =========================
    // 409 Conflict
    // =========================
    public sealed class AlreadyProcessedException : DomainException
    {
        public string ResourceName { get; }
        public string? Action { get; }

        public AlreadyProcessedException(string resourceName, string? action = null)
            : base(action is null
                ? $"{resourceName} has already been processed."
                : $"{resourceName} has already been {action}.")
        {
            ResourceName = resourceName;
            Action = action;
        }
    }

    public sealed class ConflictException : DomainException
    {
        public ConflictException(string message) : base(message) { }
    }

    // =========================
    // 400 Bad Request
    // =========================
    public sealed class BadRequestException : DomainException
    {
        public string? PropertyName { get; }

        public BadRequestException(string message, string? propertyName = null)
            : base(message)
        {
            PropertyName = propertyName;
        }
    }

    public sealed class EmptyCollectionException : DomainException
    {
        public string ResourceName { get; }

        public EmptyCollectionException(string resourceName)
            : base($"{resourceName} must not be empty.")
        {
            ResourceName = resourceName;
        }
    }

    // =========================
    // 403 Forbidden
    // =========================
    public sealed class AccessDeniedException : DomainException
    {
        public AccessDeniedException(string message = "Access denied.")
            : base(message)
        {
        }
    }

    // =========================
    // 410 Gone (Expired)
    // =========================
    public sealed class ResourceExpiredException : DomainException
    {
        public ResourceExpiredException(string message = "Resource has expired.")
            : base(message)
        {
        }
    }

    // =========================
    // 401 Unauthorized (optional)
    // =========================
    public sealed class UnauthorizedException : DomainException
    {
        public UnauthorizedException(string message = "Unauthorized.")
            : base(message)
        {
        }
    }

    // =========================
    // 500 Internal Server Error (Domain Failure)
    // =========================
    public sealed class OperationFailedException : DomainException
    {
        public OperationFailedException(string message = "Operation failed.")
            : base(message)
        {
        }

        public OperationFailedException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
