# 🔐 Authentication Service – Course Online Platform

This project is an Authentication Service built with **ASP.NET Core Web API** for an online courses platform.  
It handles user registration, login, verification, and account security.

---

## 🚀 Features

- Register using **Email or Phone Number**
- Login using **Email or Phone**
- Password hashing with **Salt**
- Email & Phone verification
- Account lockout after multiple failed login attempts
- Unlock account automatically after lockout duration
- JWT Token generation
- Secure authentication flow

---

## 🛠 Technologies Used

- ASP.NET Core Web API
- C#
- SQL Server
- Stored Procedures
- JWT Authentication
- Swagger (API Testing)

---

## 🧩 Authentication Flow

1. User registers with Email or Phone
2. Verification code is sent (Email / SMS)
3. User verifies account
4. User logs in
5. System checks:
   - Account verification
   - Account lockout status
   - Password correctness
6. JWT Token is generated on successful login

---

## 🗄 Database

- SQL Server
- Stored Procedures used:
  - `sp_LoginUser`
  - `sp_VerifyEmail`
  - `sp_UpdateLoginFailure`
  - `sp_ResetFailedLoginAttempts`

---

## 📌 Important Notes

- Passwords are stored **hashed and salted**
- Unverified accounts cannot log in
- Accounts are locked after multiple failed login attempts
- Lockout is time-based and auto-expires

---

## 🧪 API Testing

- Swagger UI is used for testing endpoints
- Default route:
## 👩‍💻 Author

**Asmaa Mostafa**  
Backend Developer (ASP.NET Core)