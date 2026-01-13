using CourseOnline.Auth.Models.Entities;
using CourseOnline.Auth.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using OtpNet;
using System.Data;


namespace CourseOnline.Auth.Repositories.Implementations
{
    public class UserVerificationRepository : IUserVerificationRepository
    {
        private readonly IConfiguration _config;
        public UserVerificationRepository(IConfiguration config)
        {
            _config = config;
        }

        public void SaveEmailVerification(long UserID, string Code, DateTime expiry)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_SaveEmailVerification", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserID", UserID);
            cmd.Parameters.AddWithValue("@Code", Code);
            cmd.Parameters.AddWithValue("@Expiry", expiry);
            con.Open();
            cmd.ExecuteNonQuery();
        }
        public void SavePhoneOtp(long UserID, string Otp, DateTime expiry)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_SavePhoneOtp", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserID", UserID);
            cmd.Parameters.AddWithValue("@OtpCode", Otp);
            cmd.Parameters.AddWithValue("@Expiry", expiry);
            con.Open();
            cmd.ExecuteNonQuery();
        }
        public bool VerifyEmail(string code)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_VerifyEmail", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Code", code);
            con.Open();
            return cmd.ExecuteNonQuery() > 0;
        }
        public bool VerifyPhone(long userId, string otp)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_VerifyPhoneOtp", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserID", userId);
            cmd.Parameters.AddWithValue("@OtpCode", otp);
            con.Open();
            return cmd.ExecuteNonQuery() > 0;

        }

        public void SaveResetPasswordCode(long userId, string code, DateTime expiry)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_SaveResetPasswordCode", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UserID", userId);
            cmd.Parameters.AddWithValue("@Code", code);
            cmd.Parameters.AddWithValue("@Expiry", expiry);

            con.Open();
            cmd.ExecuteNonQuery();
        }
        public void UpdatePassword(long userId, string hash, string salt)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_UpdatePassword", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UserID", userId);
            cmd.Parameters.AddWithValue("@Hash", hash);
            cmd.Parameters.AddWithValue("@Salt", salt);

            con.Open();
            cmd.ExecuteNonQuery();
        }

      
        


    }
}
