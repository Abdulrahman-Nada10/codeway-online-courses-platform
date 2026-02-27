using CourseOnline.Auth.Repositories.Interfaces___Copy;
using Microsoft.Data.SqlClient;

namespace CourseOnline.Auth.Repositories.Implementations
{
    public class SocialAuthRepository : ISocialAuthRepository
    {
        private readonly IConfiguration _config;
        public SocialAuthRepository(IConfiguration config)
        {
            _config = config;
        }

        public (bool Success, string Message, long? UserID, string Role) SocialLogin(string provider, string providerUserId, string email, string userName)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_BasicUsers_SocialLogin", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Provider", provider);
            cmd.Parameters.AddWithValue("@ProviderUserID", providerUserId);
            cmd.Parameters.AddWithValue("@Email", email);
            cmd.Parameters.AddWithValue("@UserName", userName);

            con.Open();

            using var reader = cmd.ExecuteReader();

            if (!reader.Read())
                return (false, "هذا المستخدم موجود بالفعل. حاول تسجيل الدخول أو استخدم حساب Social.", null, null);

            var userId = Convert.ToInt64(reader["UserID"]);
            var role = reader["Role"]?.ToString() ?? "Student";

            return (true, "Social login successful", userId, role); // ← أضفنا role

        }
    }
}