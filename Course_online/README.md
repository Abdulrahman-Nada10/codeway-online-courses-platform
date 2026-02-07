# 🎓 CourseOnline - Online Courses Platform

A modern, secure, and scalable ASP.NET Core authentication and profile management service for an online courses platform.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Database Setup](#database-setup)
- [Authentication](#authentication)
- [DTOs Documentation](#dtos-documentation)
- [Contributing](#contributing)
- [Support](#support)

## 🎯 Overview

CourseOnline is an authentication and profile management microservice built with **ASP.NET Core 8.0**. It provides secure user authentication, profile management, enrollment tracking, and certificate management for an online courses platform.

## ✨ Features

### Authentication
- ✅ JWT-based authentication with Bearer tokens
- ✅ OAuth 2.0 social login (Google, GitHub)
- ✅ Email verification with OTP
- ✅ SMS verification (Twilio integration)
- ✅ Secure password management with encryption
- ✅ User registration and login validation

### User Management
- ✅ User registration and login
- ✅ Profile management with image uploads
- ✅ Bio and personal information updates
- ✅ User verification system (email & phone)
- ✅ Profile photo management
### Course Management 	
- ✅ View enrolled courses with progress tracking
- ✅ Track course progress percentage
- ✅ View earned certificates
- ✅ Enrollment status and expiry date tracking
- ✅ Average progress calculation

### Security	
- ✅ JWT token validation with claims
- ✅ CORS support for cross-origin requests
- ✅ Secure file uploads with GUID naming
- ✅ Password encryption with hashing and salting
- ✅ OAuth token handling

## 🛠 Tech Stack	
- **Framework**: ASP.NET Core 8.0
- **Language**: C# 12.0
- **Database**: SQL Server with Stored Procedures
- **Authentication**: JWT Bearer + OAuth 2.0
- **ORM**: Entity Framework Core 8.0.2
- **Email**: MailKit 4.14.1		
- **SMS**: Twilio 7.14.0
- **API Documentation**: Swagger/OpenAPI 6.6.2
- **Data Access**: Dapper 2.1.66 + SQL Client
- **Security**: Bouncy Castle 1.9.0
	
		
## 📋 Prerequisites

- .NET 8.0 SDK or later
- SQL Server 2019 or later
- Visual Studio 2022 or Visual Studio Code
- Twilio account (for SMS verification)
- MailKit compatible email service

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/CourseOnline.git
cd CourseOnline
```

2. **Restore dependencies**
```bash
dotnet restore
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
JWT_SECRET=your_jwt_secret
DB_CONNECTION_STRING=your_db_connection_string
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
MAILKIT_USERNAME=your_mailkit_username
MAILKIT_PASSWORD=your_mailkit_password
```

4. **Build the project**
```bash
dotnet build
```

## ⚙️ Configuration

### JWT Configuration
In `appsettings.json`, configure the JWT settings:
```json
"JwtSettings": {
"SecretKey": "your_jwt_secret",
"Issuer": "CourseOnline",
"Audience": "CourseOnlineUsers",
"ExpirationMinutes": 60
}
```

### CORS Configuration
The API supports CORS for specified origins:
```json
"AllowedOrigins": [
"https://yourfrontend.com",
"http://localhost:3000"
]
```

### Database Configuration
Connection string for SQL Server:
```json
"ConnectionStrings": {
"DefaultConnection": "Server=your_server;Database=CourseOnlineDb;User Id=your_user;Password=your_password;"
}
```

## 📡 API Endpoints

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- Request body: `{ "email": "user@example.com", "password": "string", "name": "string" }`
- Response: `201 Created`

#### Login
- **POST** `/api/auth/login`
- Request body: `{ "email": "user@example.com", "password": "string" }`
- Response: `200 OK`

#### Verify Email
- **POST** `/api/auth/verify-email`
- Request body: `{ "email": "user@example.com", "otp": "123456" }`
- Response: `200 OK`

#### Send OTP
- **POST** `/api/auth/send-otp`
- Request body: `{ "email": "user@example.com" }`
- Response: `200 OK`

#### Refresh Token
- **POST** `/api/auth/refresh-token`
- Request body: `{ "refreshToken": "string" }`
- Response: `200 OK`

### User Profile Endpoints

#### Get User Profile
- **GET** `/api/user/profile`
- Response: `200 OK`

#### Update User Profile
- **PUT** `/api/user/profile`
- Request body: `{ "name": "string", "bio": "string" }`
- Response: `200 OK`

#### Upload Profile Photo
- **POST** `/api/user/profile/photo`
- Request body: `form-data` with file
- Response: `200 OK`

#### Verify Phone Number
- **POST** `/api/user/verify-phone`
- Request body: `{ "phoneNumber": "string", "otp": "123456" }`
- Response: `200 OK`

### Course Endpoints

#### Get Enrolled Courses
- **GET** `/api/courses/enrolled`
- Response: `200 OK`

#### Get Course Certificates
- **GET** `/api/courses/certificates`
- Response: `200 OK`

#### Track Course Progress
- **POST** `/api/courses/progress`
- Request body: `{ "courseId": "string", "progress": 50 }`
- Response: `200 OK`

## 📁 Project Structure

- `CourseOnline.sln` - Solution file
- `src/` - Source files
  - `CourseOnline.Api/` - Web API project
  - `CourseOnline.Core/` - Core business logic
  - `CourseOnline.Data/` - Data access layer
  - `CourseOnline.Services/` - Application services
  - `CourseOnline.Tests/` - Unit and integration tests
- `docs/` - Documentation files
- `.dockerignore` - Docker ignore file
- `.env.example` - Example environment variables file
- `.gitignore` - Git ignore file
- `README.md` - This README file

## 🗄️ Database Setup

### Create Database
```sql
CREATE DATABASE CourseOnlineDb;
```

### Create Tables
   ```sql
CREATE TABLE Users (
    Id INT PRIMARY KEY,
    Name NVARCHAR(100),
    Email NVARCHAR(100) UNIQUE,
    PasswordHash NVARCHAR(255),
    PhoneNumber NVARCHAR(15),
    IsEmailVerified BIT DEFAULT 0,
    IsPhoneVerified BIT DEFAULT 0
);
```

### Run Entity Framework Migrations
```bash
dotnet ef migrations add InitialCreate --project CourseOnline.Data
dotnet ef database update --project CourseOnline.Data
```
## 🔐 Authentication

### JWT Bearer Token Flow
1. User registers/logs in
2. Server validates credentials
3. Server generates JWT token with claims
4. Client stores token in localStorage/sessionStorage
5. Client includes token in Authorization header: `Authorization: Bearer <token>`
6. Server validates token on each request

### Token Claims
- `sub`: Subject (user identifier)
- `jti`: JWT ID (unique identifier for the token)
- `iat`: Issued at (timestamp)
- `nbf`: Not before (timestamp)
- `exp`: Expiration (timestamp)
- `role`: Role (user role, e.g., admin/user)
- `email`: User's email address

### OAuth 2.0 Social Login
- **Google**: Requires `ClientId` and `ClientSecret`
- **GitHub**: Requires `ClientId` and `ClientSecret`

## 📚 DTOs Documentation

### Auth DTOs
- `RegisterDto`: `{ "email": "string", "password": "string", "name": "string" }`
- `LoginDto`: `{ "email": "string", "password": "string" }`
- `JwtDto`: `{ "accessToken": "string", "refreshToken": "string" }`
- `VerifyEmailDto`: `{ "email": "string", "otp": "string" }`
- `SendOtpDto`: `{ "email": "string" }`

### User DTOs
- `UserProfileDto`: `{ "id": "int", "name": "string", "email": "string", "bio": "string", "phoneNumber": "string" }`
- `UpdateUserProfileDto`: `{ "name": "string", "bio": "string" }`
- `UploadProfilePhotoDto`: `{ "file": "binary" }`
- `VerifyPhoneNumberDto`: `{ "phoneNumber": "string", "otp": "string" }`

### Course DTOs
- `CourseDto`: `{ "id": "int", "title": "string", "description": "string", "instructor": "string", "duration": "string", "price": "decimal" }`
- `EnrollmentDto`: `{ "courseId": "int", "userId": "int", "enrollmentDate": "datetime", "progress": "decimal" }`
- `CertificateDto`: `{ "id": "int", "userId": "int", "courseId": "int", "issueDate": "datetime", "expiryDate": "datetime" }`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards
- Follow C# coding conventions
- Use async/await for I/O operations
- Include XML documentation for public methods
- Write unit tests for new features
- Run `dotnet format` before committing

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For support, email support@courseonline.com or open an issue on GitHub.

### FAQ

**Q: How do I reset my password?**
A: Use the `/api/auth/forgot-password` endpoint to request a password reset link via email.

**Q: How long are JWT tokens valid?**
A: By default, JWT tokens expire in 60 minutes. You can use the refresh token to get a new one.

**Q: Can I use the API with mobile apps?**
A: Yes, the API supports mobile applications via standard HTTP requests with Bearer token authentication.

**Q: How are user passwords secured?**
A: Passwords are hashed using bcrypt with salt before storage in the database.

## 🔄 Updates & Roadmap

### Planned Features
- Two-factor authentication (2FA)
- Advanced course recommendations
- Course completion certificates with blockchain verification
- Mobile app integration
- Real-time course notifications
- Progress analytics dashboard

### Recent Updates
- ✅ JWT authentication implementation
- ✅ OAuth 2.0 social login
- ✅ Email verification system
- ✅ Profile management features
- ✅ Course progress tracking

---

Built with ❤️ by Asmaa Mostafa
