# OnlineCourseSystem.Notifications

ASP.NET Core 8.0 microservice that centralizes notification delivery for the Codeway Online Courses platform. It exposes REST APIs for creating notifications and managing per-user delivery preferences while persisting multi-channel delivery data (in-app, email, push) via SQL Server and Entity Framework Core.

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Local Setup](#local-setup)
7. [Running & Tooling](#running--tooling)
8. [API Surface](#api-surface)
9. [Validation & Error Handling](#validation--error-handling)
10. [Deployment Notes](#deployment-notes)
11. [Operational Checklist](#operational-checklist)

## Features

- **Multi-channel delivery:** Persists in-app notifications and stages email/push messages via the Outbox pattern (EmailOutbox / PushOutbox tables) for asynchronous workers.
- **User-level preferences:** CRUD logic for notification preferences with sensible defaults and per-channel toggles (`InApp`, `Email`, `Push`).
- **Bulk fan-out:** Accepts multiple user IDs per notification using a SQL TVP to keep calls efficient.
- **Hard validation & DTOs:** FluentValidation guards payloads before they reach the domain logic.
- **Retry-aware stored procedure call:** Notification creation replays transient SQL failures with exponential backoff.
- **Unified responses:** `GlobalResponse.Shared` provides consistent success/error envelopes across controllers, filters, and middleware.

## Architecture

```
Client → REST API (Controllers)
         ↓
     Services layer (NotificationService, PreferenceService)
         ↓
 Entity Framework Core + Stored procedures (sp_CreateNotification)
         ↓
 SQL Server (Notifications, UserNotifications, NotificationPreferences, Outbox tables)
```

- `NotificationService` validates target users, converts payloads to the `dbo.UserIdTableType`, and executes `sp_CreateNotification` to fan out records and enqueue outbox rows.
- `PreferenceService` manages defaults and customizations for each notification type.
- Custom middleware (`ExceptionMiddleware`) and filters (`ValidationFilter`) keep cross-cutting policies centralized.

## Tech Stack

- .NET 8 / ASP.NET Core Web API (`Microsoft.NET.Sdk.Web`)
- Entity Framework Core 8 with SQL Server provider
- FluentValidation (with automatic MVC integration)
- Swashbuckle (Swagger/OpenAPI)
- Firebase Admin SDK (future push delivery worker)
- GlobalResponse.Shared (shared response contracts & extensions)

## Project Structure

```
OnlineCourseSystem.Notifications/
├── Controllers/                     # REST endpoints (Notifications, NotificationPreferences)
├── DTOs/                            # Request/response shapes
├── Services/                        # Domain services + repositories
├── Models/                          # Entities, enums, EF DbContext
├── Filters/                         # Validation filter
├── Middlewares/                     # Exception middleware
├── Validators/                      # FluentValidation rules
├── Database/CreateNotification.sql  # TVP + stored procedure script
├── Program.cs                       # Composition root
└── OnlineCourseSystem.Notifications.csproj
```

## Prerequisites

- .NET 8 SDK (8.0.100+)  
- SQL Server 2019+ (local or remote)  
- EF Core CLI (`dotnet tool install --global dotnet-ef`) if you plan to manage migrations.  
- Access to the shared `GlobalResponse.Shared` project (already referenced in the solution).  
- (Optional) Firebase credentials for the push worker that consumes `PushOutbox`.

## Local Setup

1. **Restore packages**
   ```powershell
   dotnet restore OnlineCourseSystem.sln
   ```
2. **Configure connection string**  
   - Update `appsettings.json` | `ConnectionStrings:DefaultConnection`, or  
   - Override via environment variable: `ConnectionStrings__DefaultConnection`.
3. **Apply migrations**
   ```powershell
   dotnet ef database update `
     --project OnlineCourseSystem.Notifications `
     --startup-project OnlineCourseSystem.Notifications
   ```
4. **Create database artifacts**  
   Run `Database/CreateNotification.sql` against the same database to ensure the TVP (`dbo.UserIdTableType`) and `sp_CreateNotification` exist.
5. **Seed references (manual/SQL)**  
   Populate `UserReferences` (and optionally `NotificationPreferences`) so that notifications can target valid users. The API will lazily create default preferences, but it requires `UserReferences` rows to exist.

## Running & Tooling

```powershell
dotnet run --project OnlineCourseSystem.Notifications
```

- Swagger UI is available in `Development` at `https://localhost:5001/swagger`.
- Logging levels are configured via `appsettings*.json`. Override with `Logging__LogLevel__Default`.
- The service uses HTTPS redirection and expects requests over TLS in production.

## API Surface

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/notifications` | `POST` | Creates a notification for one or more users (fan-out via stored procedure). |
| `/api/notificationpreferences/{userId}` | `GET` | Returns channel preferences for the user, auto-seeding defaults if missing. |
| `/api/notificationpreferences/{userId}` | `POST` | Updates the Email/Push flags for a specific notification type. |

### Sample: Create Notification

```http
POST /api/notifications
Content-Type: application/json

{
  "notificationType": "Course",
  "title": "New lesson released!",
  "content": "Lesson 5 is now available.",
  "courseId": "5f2c8c2c-18d8-46b0-b4e9-f0e4dc8e6a61",
  "userIds": [
    "c8c49232-4c8a-4f8c-8de1-4a70c7ad1140",
    "15a07664-ef29-4f55-b93d-4fbc0c8337aa"
  ]
}
```

### Sample: Update Preferences

```http
POST /api/notificationpreferences/{userId}
Content-Type: application/json

{
  "notificationType": "Reminder",
  "email": true,
  "push": false
}
```

## Validation & Error Handling

- `CreateNotificationValidator` enforces enum values, title/content length, required user IDs, and conditional `CourseId` logic.
- `ValidationFilter` intercepts invalid model states and responds with a standardized 400 payload (`ApiResponse`).
- `ExceptionMiddleware` wraps unhandled exceptions into a consistent 500 response and prevents leaking stack traces.
- Controller responses use `GlobalResponse.Shared.Extensions` (`OkResponse`, etc.) ensuring uniform JSON envelopes.

## Deployment Notes

1. **Build/Publish**
   ```powershell
   dotnet publish OnlineCourseSystem.Notifications `
     -c Release -o publish/notifications
   ```
2. **Environment configuration**
   - Provide `ConnectionStrings__DefaultConnection`.
   - Configure logging overrides (e.g., `Logging__LogLevel__Microsoft__AspNetCore=Warning`).
3. **Database readiness**
   - Run EF migrations.
   - Execute `Database/CreateNotification.sql` after migrations whenever deploying to a new environment.
4. **Background processing**
   - The API writes to `EmailOutbox`/`PushOutbox`. Ensure the corresponding dispatcher jobs/workers are deployed and pointing at the same database.
5. **Observability**
   - Built-in logging uses `ILogger<T>`; connect to Application Insights, ELK, or structured log sinks as needed.
