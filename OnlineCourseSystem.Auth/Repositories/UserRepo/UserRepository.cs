using Microsoft.Data.SqlClient;

namespace OnlineCourseSystem.Auth
{
    public class UserRepository(IConfiguration config) : IUserRepository
    {
        private readonly IConfiguration _config = config;

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
            cmd.Parameters.AddWithValue("@PhoneNumber", phoneNumber);
            con.Open();
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new User
                {
                    UserID = Convert.ToInt64(reader["UserID"]),
                    UserName = reader["UserName"].ToString()!,
                    Email = reader["Email"].ToString(),
                    PhoneNumber = reader["PhoneNumber"].ToString(),
                    PasswordHash = reader["PasswordHash"].ToString()!,
                    PasswordSalt = reader["PasswordSalt"].ToString()!
                };
            }
            return null!;
        }

        public List<User> GetAllUsers()
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_GetAllUsers", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            con.Open();
            using var reader = cmd.ExecuteReader();
            var users = new List<User>();
            while (reader.Read())
            {
                users.Add(new User
                {
                    UserID = Convert.ToInt64(reader["UserID"]),
                    UserName = reader["UserName"]?.ToString()!,
                    Email = reader["Email"]?.ToString(),
                    PhoneNumber = reader["PhoneNumber"]?.ToString(),
                    Role = reader["Role"]?.ToString()!,
                    IsActive = Convert.ToBoolean(reader["IsActive"]),
                    IsLocked = Convert.ToBoolean(reader["IsLocked"])
                });
            }
            return users;
        }

        public User GetUserById(long userId)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_GetUserById", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserID", userId);
            con.Open();
            using var reader = cmd.ExecuteReader();
            if (!reader.Read()) return null;
            return new User
            {
                UserID = Convert.ToInt64(reader["UserID"]),
                UserName = reader["UserName"]?.ToString()!,
                Email = reader["Email"]?.ToString(),
                PhoneNumber = reader["PhoneNumber"]?.ToString(),
                Role = reader["Role"]?.ToString()!,
                IsActive = Convert.ToBoolean(reader["IsActive"]),
                IsLocked = Convert.ToBoolean(reader["IsLocked"])
            };
        }

        public void UpdateRole(long userId, string role)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_UpdateUserRole", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserID", userId);
            cmd.Parameters.AddWithValue("@Role", role);
            con.Open();
            cmd.ExecuteNonQuery();
        }
    }
}
