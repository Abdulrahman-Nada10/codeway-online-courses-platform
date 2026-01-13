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

        public (bool Success, string Message, long? UserID) SocialLogin(string provider, string providerUserId, string email, string userName)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_BasicUsers_SocialLogin", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Provider", provider);
            cmd.Parameters.AddWithValue("@ProviderUserID", providerUserId);
            cmd.Parameters.AddWithValue("@Email", email);
            cmd.Parameters.AddWithValue("@UserName", userName);

            con.Open();

            var result = cmd.ExecuteScalar();

            if (result == null || result == DBNull.Value)
                return (false, "هذا المستخدم موجود بالفعل. حاول تسجيل الدخول أو استخدم حساب Social.", null);

            return (true, "Social login successful", Convert.ToInt64(result));
        }
    }
}