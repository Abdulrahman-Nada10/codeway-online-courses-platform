# 🎓 CodeWay — Online Courses Platform (Backend)

A **microservices-based** backend for a full-featured online learning platform built with **.NET / ASP.NET Core**. The system handles user authentication, course management, course content delivery, payment processing, certificate generation, notifications, and inter-service messaging.

---

## 📐 Architecture Overview

The backend is structured as a **microservices solution** (`OnlineCourseSystem.sln`) where each service is independently deployable and owns its own domain. Services communicate asynchronously via a **shared messaging contracts library**.

```
OnlineCourseSystem/
├── OnlineCourseSystem.Auth                     → Authentication & user management
├── CourseMangment.MicroService                 → Course catalog & enrollment
├── CourseContentMicroService                   → Lessons, videos & course materials
├── OnlineCourse.Payment                        → Payment processing
├── CertificateGenerationMicroService           → PDF certificate generation
├── OnlineCourseSystem.Notifications            → Email & push notifications
├── OnlineCourseSystem.Contracts.Messaging      → Shared messaging contracts (events/messages)
├── GlobalResponse.Shared                       → Shared utilities, response wrappers & middleware
└── Course_online                               → (Database backup / seed data)
```

---

## 🧩 Microservices Breakdown

### 1. `OnlineCourseSystem.Auth` — Authentication Service

Handles all identity and access concerns.

**Key Features:**
- JWT Bearer token authentication (access tokens)
- Cookie-based OAuth flow support
- Social login: **Google**, **GitHub** (via ASP.NET Core OAuth middleware)
- User registration, login, and email verification
- Role-based authorization (`IRoleService`)
- User profile management with file upload (`FileHelper`)
- Duplicate request protection middleware
- Password policy configuration via `appsettings.json`
- Localized error messages (`LocalizedMessageService`)

**Folder Structure:**
```
OnlineCourseSystem.Auth/
├── Controllers/        → API endpoints (Auth, Profile, Social)
├── Services/           → Business logic (AuthService, JwtService, SocialService, ProfileService, RoleService)
├── Repositories/       → Data access (LoginRepository, UserRepository, VerificationRepository, SocialRepository, ProfileRepository)
├── Models/             → Domain models (User, Role, etc.)
├── DTOs/               → Request/response transfer objects
├── Attributes/         → Custom validation/authorization attributes
├── Helper/             → File upload helpers
└── Infrastructure/     → DbContext, EF Core configuration
```

---

### 2. `CourseMangment.MicroService` — Course Management Service

Manages the course catalog, instructor/student relationships, and enrollment.

**Key Features:**
- CRUD operations for courses and categories
- Enrollment management
- Clean Architecture layers: Domain → Application → Infrastructure → Controllers

**Folder Structure:**
```
CourseMangment.MicroService/
├── Controllers/        → API endpoints
├── Application/        → Use cases, DTOs, service interfaces
├── Domain/             → Entities and domain logic (Course, Category, Enrollment)
└── Infrastructure/     → EF Core DbContext, repository implementations
```

---

### 3. `CourseContentMicroService` — Course Content Service

Responsible for delivering course materials: lessons, sections, and video content.

**Key Features:**
- Manage sections and lessons within a course
- Video/media content linking
- Progress tracking per student

---

### 4. `OnlineCourse.Payment` — Payment Service

Handles course purchase transactions.

**Key Features:**
- Payment gateway integration (Fawatarak or similar)
- Order and transaction management
- Enrollment trigger after successful payment (event-driven)

---

### 5. `CertificateGenerationMicroService` — Certificate Service

Generates completion certificates for students who finish a course.

**Key Features:**
- PDF certificate generation
- Triggered by course completion events
- Personalized certificate with student name and course details

---

### 6. `OnlineCourseSystem.Notifications` — Notifications Service

Sends email and/or push notifications to users.

**Key Features:**
- Email notifications (registration, payment confirmation, certificate ready)
- Subscribes to domain events from the messaging contracts

---

### 7. `OnlineCourseSystem.Contracts.Messaging` — Shared Messaging Contracts

A shared class library containing the event/message contracts used for **asynchronous inter-service communication** (e.g., via RabbitMQ / MassTransit or a similar message broker).

**Contains:**
- Event definitions (e.g., `PaymentCompletedEvent`, `EnrollmentCreatedEvent`, `CourseCompletedEvent`)
- Shared DTOs used across service boundaries

> All microservices that produce or consume messages reference this project to ensure contract consistency.

---

### 8. `GlobalResponse.Shared` — Shared Utilities Library

A shared class library consumed by all microservices to enforce consistent API behavior.

**Contains:**
- `ApiResponse<T>` — standardized JSON response wrapper
- `LocalizedMessageService` — localization support for error/success messages
- `DuplicateProtectionOptions` + middleware — prevents duplicate HTTP requests (idempotency layer)
- `AuthOptions`, `PasswordPolicyOptions` — strongly-typed configuration models
- Common extension methods and base classes

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | ASP.NET Core (.NET 8) |
| **Language** | C# |
| **ORM** | Entity Framework Core |
| **Database** | SQL Server |
| **Authentication** | JWT Bearer + Cookie OAuth |
| **Social Login** | Google, GitHub (via ASP.NET OAuth) |
| **API Docs** | Swagger / OpenAPI |
| **Architecture** | Microservices + Clean Architecture |
| **Messaging** | Shared contracts library (event-driven) |
| **File Storage** | Local / configurable via `FileHelper` |

---

## 🔐 Authentication Flow

```
Client
  │
  ├─ POST /api/auth/register      → Creates user account
  ├─ POST /api/auth/login         → Returns JWT token
  ├─ GET  /api/auth/social/google → Redirects to Google OAuth
  ├─ GET  /api/auth/social/github → Redirects to GitHub OAuth
  └─ Bearer Token (JWT) ─────────→ All protected endpoints
```

JWT tokens are validated on every request using `ValidateIssuer`, `ValidateAudience`, `ValidateLifetime`, and `ValidateIssuerSigningKey`.

---

## ⚙️ Configuration

Each microservice has its own `appsettings.json`. Key sections to configure:

### Auth Service (`OnlineCourseSystem.Auth/appsettings.json`)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "<SQL Server connection string>"
  },
  "Jwt": {
    "Key": "<your-secret-key>",
    "Issuer": "<issuer>",
    "Audience": "<audience>"
  },
  "Auth": {
    "Google": { "ClientId": "", "ClientSecret": "" },
    "GitHub": { "ClientId": "", "ClientSecret": "" }
  },
  "PasswordPolicyOptions": {
    "RequireUppercase": true,
    "MinimumLength": 8
  },
  "DuplicateProtection": {
    "WindowSeconds": 5
  }
}
```

### Other Services
Each service has its own `appsettings.json` with its `ConnectionStrings` and service-specific configuration.

> ⚠️ **Never commit real secrets.** Use environment variables or a secrets manager in production.

---

## 🚀 Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- SQL Server (local or Azure)
- Visual Studio 2022 / JetBrains Rider

### Run a Single Service

```bash
# Example: run the Auth service
cd OnlineCourseSystem.Auth
dotnet restore
dotnet run
```

Swagger UI will be available at: `https://localhost:{port}/swagger`

### Run the Full Solution

Open `OnlineCourseSystem.sln` in Visual Studio or Rider and configure **multiple startup projects** (one per microservice you want to run simultaneously).

### Apply Database Migrations

```bash
cd OnlineCourseSystem.Auth
dotnet ef database update
```

Repeat for each service that has its own DbContext.

---

## 📁 Solution File

`OnlineCourseSystem.sln` — the Visual Studio solution file that references all 8 projects. Open this to work with the full system.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: your feature description"`
4. Push and open a Pull Request targeting the `backend` branch

---

## 📄 License

This project is for educational and portfolio purposes.
