namespace OnlineCourseSystem.Auth
{
    public class User
    {
        public long UserID { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string PasswordHash { get; set; } = string.Empty;
        public string PasswordSalt { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public bool IsEmailVerified { get; set; }

        public bool IsPhoneVerified { get; set; }
        public bool HasEmailVerified { get; set; }

        public int FailedLoginAttempt { get; set; }
        public bool IsLocked { get; set; }
        public bool IsActive { get; set; }
        public string ResetPasswordCode { get; set; } = string.Empty;
        public string AuthType = "Local"; // Local | Google | Facebook | GitHub
        public DateTime? ResetPasswordExpiry { get; set; }  // Nullable عشان يكون ممكن يكون null
        public DateTime? LockoutEnd { get; set; }
        public string Role { get; set; } = "Student";
    }
}
