using Microsoft.Data.SqlClient;
using System.Data;

namespace OnlineCourseSystem.Auth;

public class LoginRepository(IConfiguration config) : ILoginRepository
{
    private readonly IConfiguration _config = config;

    public User GetbyLogin(string Login)
    {
        using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
        using var cmd = new SqlCommand("sp_LoginUser", con);
        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@Login", Login);
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

    public void ResetFailedLoginAttempts(long UserID)
    {
        using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
        using var cmd = new SqlCommand("sp_UpdateLoginSuccess", con);

        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@UserID", UserID);

        con.Open();
        cmd.ExecuteNonQuery();
    }

    public void UpdateLoginFailure(long UserID)
    {
        using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
        using var cmd = new SqlCommand("sp_sp_UpdateLoginFailure", con);

        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@UserId", UserID);

        con.Open();
        cmd.ExecuteNonQuery();
    }
}
