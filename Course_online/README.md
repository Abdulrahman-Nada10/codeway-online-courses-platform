# Authentication & Profile Service – Training Project  
### Course Online Platform – ASP.NET Core Web API

## Overview
This is a **training project** for the Course Online Platform.  
It demonstrates **Authentication, Authorization, Profile Management, Enrollments, and Certificates** in a secure and structured way.  
The project follows **best practices in backend development**, including JWT authentication, password hashing, and stored procedure usage.

---

## Features

### Authentication
- Register with **Email or Phone Number**
- Login with **Email or Phone**
- Secure password hashing with **Salt**
- Email & Phone verification
- Account lockout after multiple failed login attempts
- Automatic unlock after lockout duration
- JWT-based authentication for protected endpoints

---

### Profile Management
- Update profile:
  - Full Name
  - Bio
  - Profile Photo (File Upload)
- Retrieve authenticated user profile
- JWT authentication required

---

### Enrollments & Progress
- View enrolled courses
- Track course progress per course
- Calculate overall learning progress
- Returns friendly messages when no enrollments exist

---

### Certificates
- View earned certificates linked to courses
- Returns informative message if none exist

---

## Technology Stack
- ASP.NET Core Web API  
- C#  
- SQL Server  
- Stored Procedures  
- JWT Authentication  
- Swagger / OpenAPI  
- File Upload Handling

---

## Auth Flow
1. User registers (Email / Phone)  
2. Verification code sent via Email/SMS  
3. User verifies account  
4. User logs in  
5. System validates verification, lockout, and password  
6. JWT token issued on success  
7. Protected endpoints require JWT token

---

## Database
- SQL Server with Stored Procedures for all data operations

### Key Stored Procedures
- `sp_LoginUser`  
- `sp_VerifyEmail`  
- `sp_UpdateLoginFailure`  
- `sp_ResetFailedLoginAttempts`  
- `sp_GetUserEnrollments`  
- `sp_GetUserCertificates`  
- `sp_UpsertUserProfile`  

---

## Security
- Passwords stored hashed & salted  
- JWT for authentication & authorization  
- User ID derived from JWT token  
- No sensitive secrets in source control  
- Social login intentionally disabled  

---

## API Testing
- Use **Swagger UI**: `https://localhost:{port}/swagger`  
- Authorize requests with token:  

---

## Author / Team
**Asmaa Mostafa** – Backend Developer (Training Project)  
Part of the **Backend Team** for Course Online Platform training.
