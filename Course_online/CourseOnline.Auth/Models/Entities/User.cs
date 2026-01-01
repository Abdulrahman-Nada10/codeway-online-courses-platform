using System.ComponentModel.DataAnnotations.Schema;

namespace CourseOnline.Auth.Models.Entities
{
    public class User
    {
        public long UserID { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
 public string UserName { get; set; }
     public bool IsEmailVerified { get; set; }
       
        public bool IsPhoneVerified { get; set; }
        public bool HasEmailVerified { get; set; }
    
        public int FailedLoginAttempt { get; set; }
        public bool IsLocked { get; set; }
   public bool    IsActive { get; set; }
      public string  ResetPasswordCode { get; set; }
       
        public DateTime? ResetPasswordExpiry { get; set; }  // Nullable عشان يكون ممكن يكون null
        public DateTime? LockoutEnd { get; set; }



    }
}
