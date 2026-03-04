# OnlineCourseSystem.Contracts.Messaging

`OnlineCourseSystem.Contracts.Messaging` contains the **canonical event contracts** that OnlineCourseSystem services use when exchanging messages through the broker (e.g., RabbitMQ/Azure Service Bus). Referencing this project keeps payload schemas aligned so publishers and consumers remain compatible.

## Actual contents

| File | Description |
| --- | --- |
| `Events/IntegrationEvent` | Abstract base record that supplies `EventId`, `OccurredAt`, and optional `CorrelationId` / `TraceId` metadata for every integration message. |
| `Events/NotificationRequestedEvent` | Concrete event published by any service to ask the Notifications service to send in-app/email/push notifications to multiple users. Includes `UserIds`, optional `CourseId`, `NotificationType`, `Title`, and `Content`. |

## Why it matters

1. **Single source of truth** – Contract changes happen once and are version-controlled.
2. **Safer refactors** – Compiler/type-system catches incompatible publisher/consumer updates.
3. **Faster onboarding** – Teams can inspect the library to understand the live integration surface.

## How other services consume it

1. **Reference the project/library**  
   Add a Project Reference (same solution) or consume the internal NuGet package (separate repo) so the shared records are available.
2. **Publish using the shared types**  
   Instantiate `NotificationRequestedEvent`, fill the required fields, and send it through your messaging abstraction.
3. **Consume using the shared types**  
   Message handlers deserialize the incoming payload into `NotificationRequestedEvent` and process the request.
4. **Coordinate version bumps**  
   When contracts change, increment the package version and update dependent services.

### Example publisher snippet

```csharp
using OnlineCourseSystem.Contracts.Messaging.Events;

var ev = new NotificationRequestedEvent
{
    UserIds = new[] { userId },
    CourseId = courseId,
    NotificationType = "Course",
    Title = "Welcome to the course!",
    Content = "You now have access to the full curriculum."
};

await messagePublisher.PublishAsync(ev);
```

> **Tip:** Treat this repository as a contract between teams—coordinate changes just like you would with a public API.
