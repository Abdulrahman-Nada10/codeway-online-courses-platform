using CourseOnline.Auth.Models.Entities;
using CourseOnline.Auth.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CourseOnline.Auth.Repositories.Implementations
{
    public class UserRepositoryLogin:IUserRepositoryLogin
    {
        private readonly IConfiguration _config;
        public UserRepositoryLogin(IConfiguration config)
        {
            _config = config;
        }

        public User GetbyLogin(string Login)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd=new SqlCommand("sp_LoginUser",con);
            cmd.CommandType=System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Login",Login);
            con.Open();
            using var reader = cmd.ExecuteReader();
            if (!reader.Read())
                return null;

            return new User
            {
                UserID = (long)reader["UserID"],
                Email = reader["Email"]?.ToString(),
                PhoneNumber = reader["PhoneNumber"]?.ToString(),
                UserName = reader["UserName"]?.ToString(),
                PasswordHash = reader["PasswordHash"]?.ToString(),
                PasswordSalt = reader["PasswordSalt"].ToString(),
                IsActive = Convert.ToBoolean(reader["IsActive"]),
                IsLocked = Convert.ToBoolean(reader["IsLocked"]),
                IsEmailVerified = reader["IsEmailVerified"] != DBNull.Value
                                   && Convert.ToBoolean(reader["IsEmailVerified"]),
               
                IsPhoneVerified = reader["IsPhoneVerified"] != DBNull.Value
                                        && Convert.ToBoolean(reader["IsPhoneVerified"]),
              

                ResetPasswordCode = reader["ResetPasswordCode"] == DBNull.Value
                    ? null
                    : reader["ResetPasswordCode"].ToString(),

                LockoutEnd = reader["LockoutEnd"] == DBNull.Value
             ? (DateTime?)null
             : (DateTime?)reader["LockoutEnd"],


            };
        }
        public void UpdateLoginFailure(long userId)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_sp_UpdateLoginFailure", con);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserId", userId);

            con.Open();
            cmd.ExecuteNonQuery();
        }
        public void ResetFailedLoginAttempts(long userId)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_UpdateLoginSuccess", con);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserID", userId);

            con.Open();
            cmd.ExecuteNonQuery();
        }
    }
}

