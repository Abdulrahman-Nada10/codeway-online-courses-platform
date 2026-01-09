namespace OnlineCourseSystem.Notifications.Exceptions
{
    /// <summary>
    /// Base exception for domain/business rule violations.
    /// </summary>
    public abstract class DomainException : Exception
    {
        protected DomainException(string message) : base(message)
        {
        }

        protected DomainException(string message, Exception? innerException)
            : base(message, innerException)
        {
        }
    }

    /// <summary>
    /// Represents a missing entity/resource.
    /// </summary>
    public class NotFoundException : DomainException
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

    /// <summary>
    /// Represents a conflict because the resource is already in the desired state.
    /// </summary>
    public class AlreadyProcessedException : DomainException
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

    /// <summary>
    /// Represents an attempt to use data that has expired.
    /// </summary>
    public class ResourceExpiredException : DomainException
    {
        public string ResourceName { get; }
        public DateTime ExpiredAt { get; }

        public ResourceExpiredException(string resourceName, DateTime expiredAt)
            : base($"{resourceName} expired on {expiredAt:yyyy-MM-dd HH:mm:ss}.")
        {
            ResourceName = resourceName;
            ExpiredAt = expiredAt;
        }
    }

    /// <summary>
    /// Represents a validation rule that requires non-empty collections.
    /// </summary>
    public class EmptyCollectionException : DomainException
    {
        public string CollectionName { get; }

        public EmptyCollectionException(string collectionName)
            : base($"{collectionName} cannot be empty.")
        {
            CollectionName = collectionName;
        }
    }

    /// <summary>
    /// Represents a forbidden access scenario.
    /// </summary>
    public class AccessDeniedException : DomainException
    {
        public string ResourceName { get; }
        public object? ResourceKey { get; }
        public Guid? SubjectId { get; }

        public AccessDeniedException(string resourceName, object? resourceKey = null, Guid? subjectId = null)
            : base(subjectId is null
                ? $"Access to {resourceName} is denied."
                : $"User '{subjectId}' is not authorized to access {resourceName}{(resourceKey is null ? string.Empty : $" '{resourceKey}'")}."
              )
        {
            ResourceName = resourceName;
            ResourceKey = resourceKey;
            SubjectId = subjectId;
        }
    }

    /// <summary>
    /// Represents a failure while performing an operation.
    /// </summary>
    public class OperationFailedException : DomainException
    {
        public string OperationName { get; }

        public OperationFailedException(string operationName, string reason)
            : base($"Failed to {operationName}: {reason}")
        {
            OperationName = operationName;
        }

        public OperationFailedException(string operationName, string reason, Exception innerException)
            : base($"Failed to {operationName}: {reason}", innerException)
        {
            OperationName = operationName;
        }
    }

    /// <summary>
    /// Represents invalid domain data or payload.
    /// </summary>
    public class InvalidDataException : DomainException
    {
        public string PropertyName { get; }

        public InvalidDataException(string propertyName, string message)
            : base($"Invalid {propertyName}: {message}")
        {
            PropertyName = propertyName;
        }
    }
}
