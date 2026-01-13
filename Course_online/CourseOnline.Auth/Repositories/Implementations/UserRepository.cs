using CourseOnline.Auth.Models.Entities;
using CourseOnline.Auth.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CourseOnline.Auth.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;
        public UserRepository(IConfiguration config)
        {
            _config = config;
        }
        public bool UserExsits(string? email, string? phone)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_CheckUserExists", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Email", (object?)email ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@Phone", (object?)phone ?? DBNull.Value);
            con.Open();
            return (int)cmd.ExecuteScalar() > 0;
        }

///to returen User id use long
        public long CreateUser(User user)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_RegisterUser", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Email", (object?)user.Email ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@PhoneNumber", (object?)user.PhoneNumber ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@PasswordHash", (object)user.PasswordHash ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@Username", (object?)user.UserName ?? DBNull.Value); 
            
            cmd.Parameters.AddWithValue("@PasswordSalt", (object?)user.PasswordSalt ?? DBNull.Value);

            con.Open();
            ;
            return Convert.ToInt64(cmd.ExecuteScalar());
        }

       public User GetUserByEmailOrPhone(string email, string phoneNumber)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_GetUserByEmailOrPhone", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Email", email);
            cmd.Parameters.AddWithValue("@PhoneNumber",phoneNumber );
            con.Open();
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new User
                {
                    UserID = Convert.ToInt64(reader["UserID"]),
                    UserName = reader["UserName"].ToString(),
                    Email = reader["Email"].ToString(),
                    PhoneNumber = reader["PhoneNumber"].ToString(),
                    PasswordHash = reader["PasswordHash"].ToString(),
                    PasswordSalt = reader["PasswordSalt"].ToString()
                };
            }
            return null;
        }
    }
    }


