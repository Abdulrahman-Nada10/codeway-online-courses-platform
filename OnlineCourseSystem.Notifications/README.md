![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2019+-CC2927?style=flat-square&logo=microsoft-sql-server&logoColor=white)
![Status](https://img.shields.io/badge/Status-Beta-orange?style=flat-square)

# OnlineCourseSystem.Notifications

ASP.NET Core 8 microservice that centralizes notification delivery for the Codeway Online Courses platform. It exposes REST APIs for creating notifications, orchestrates user-level preferences, and stages multi-channel delivery (in-app, email, push) via SQL Server and the Outbox pattern.

## Table of Contents

1. [Overview](#overview)
2. [Highlights](#highlights)
3. [Architecture](#architecture)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Running the Service](#running-the-service)
8. [Configuration](#configuration)
9. [API Surface](#api-surface)
10. [Background Processing](#background-processing)
11. [Validation & Error Handling](#validation--error-handling)
12. [Deployment Checklist](#deployment-checklist)
13. [Development & Testing](#development--testing)
14. [Contributing](#contributing)
15. [License](#license)

## Overview

The Notifications service is a shared platform component. It receives high-level notification intents, validates the audience, persists user-specific copies, and stages outbound email/push jobs. A shared response layer (`GlobalResponse.Shared`) keeps payloads consistent everywhere.

## Highlights

- **Multi-channel fan-out:** Persists in-app notifications and enqueues email/push work through the Outbox pattern.
- **Preference orchestration:** Per-user channel toggles with sensible defaults and lazy creation when queried.
- **Resilient SQL integration:** `sp_CreateNotification` + table-valued parameters batch inserts while supporting retry/backoff.
- **Guard rails:** FluentValidation + custom middleware provide strict validation and structured errors.
- **Infra ready:** Designed to work with background workers and containerized deployments.

## Architecture

```
Client / Event Bus
        ↓
Controllers (Notifications, Preferences)
        ↓
Services (NotificationService, PreferenceService)
        ↓
EF Core + Stored Procedure (sp_CreateNotification)
        ↓
SQL Server (Notifications, UserNotifications, Preferences, Outbox tables)
```

- `NotificationService` validates users, converts IDs into `dbo.UserIdTableType`, and executes the stored procedure that inserts notifications and Outbox rows in one transaction.
- `PreferenceService` manages defaults/custom overrides for each notification type.
- `ExceptionMiddleware` + `ValidationFilter` keep cross-cutting policies centralized.

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
├── Controllers/                     # REST endpoints
├── DTOs/                            # Request/response contracts
├── Services/                        # Domain orchestration + UoW
├── Repositories/                    # EF Core repositories
├── Models/                          # Entities, enums, DbContext
├── Validators/                      # FluentValidation rules
├── Filters & Middlewares/           # Validation + exception handling
├── Database/CreateNotification.sql  # TVP + stored procedure
├── Program.cs                       # Composition root
└── OnlineCourseSystem.Notifications.csproj
```

## Getting Started

### Prerequisites

- .NET 8 SDK (8.0.100+)  
- SQL Server 2019+ (local or remote)  
- EF Core CLI (`dotnet tool install --global dotnet-ef`) if you plan to manage migrations.  
- Access to the shared `GlobalResponse.Shared` project (already referenced in the solution).  
- (Optional) Firebase credentials for the push worker that consumes `PushOutbox`.

### Local Setup

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

## Running the Service

```powershell
dotnet run --project OnlineCourseSystem.Notifications
```

- Swagger UI is available in `Development` at `https://localhost:5001/swagger`.
- Logging levels are configured via `appsettings*.json`. Override with `Logging__LogLevel__Default`.
- The service uses HTTPS redirection and expects requests over TLS in production.

## Configuration

| Setting | Description |
| --- | --- |
| `ConnectionStrings__DefaultConnection` | SQL Server connection string used by EF Core. |
| `Logging__LogLevel__*` | Override logging verbosity per category. |
| `Email:*` (future) | Email worker settings (from address, retries, etc.). |
| `Firebase:*` (future) | Push worker credentials and project info. |

> All settings can be supplied via `appsettings.{Env}.json`, environment variables, or user secrets.

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

## Deployment Checklist

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

## Background Processing

- **EmailOutboxWorker** — Dequeues `EmailOutbox` records, sends via SMTP, and marks rows as sent/failed.
- **PushOutboxWorker** — Integrates with Firebase Cloud Messaging (FCM) and tracks provider IDs/errors.
- **ScheduledNotificationWorker** — Dispatches scheduled reminders by reading `ScheduledNotifications` in batches.

Each worker is a hosted service/console app that shares the same database so that this API can remain stateless.

## Development & Testing

- Format: `dotnet format OnlineCourseSystem.Notifications`
- Tests: `dotnet test OnlineCourseSystem.sln`
- Add migration:
  ```powershell
  dotnet ef migrations add <Name> `
    --project OnlineCourseSystem.Notifications `
    --startup-project OnlineCourseSystem.Notifications
  ```

## Contributing

1. Fork & create a feature branch.
2. Follow coding standards (nullable reference types, async/await, logging).
3. Add or update tests whenever functionality changes.
4. Run `dotnet format` and `dotnet test` before submitting a PR.
5. Document migrations or schema changes in the PR description.

## License

License details will be finalized before public release. Treat as "all rights reserved" internally until then.
