using CourseOnline.Auth.Models.Entities;
using CourseOnline.Auth.Repositories.Interfaces___Copy;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CourseOnline.Auth.Repositories.Implementations
{
    public class ProfileRepository : IProfileRepository

    {
        public readonly IConfiguration _config;
        public ProfileRepository(IConfiguration config)
        {
            _config = config;
        }

        public UserProfile GetUserProfile(long userId)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_GetUserProfile", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserID", userId);

            con.Open();
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new UserProfile
                {
                    UserID = reader.GetInt64(reader.GetOrdinal("UserID")),
                   
                  
                    UserName = reader["UserName"] == DBNull.Value ? "" : reader["UserName"].ToString(),
                    Bio = reader["Bio"] == DBNull.Value ? "" : reader["Bio"].ToString(),
                    PhotoUrl = reader["PhotoURL"] == DBNull.Value ? "" : reader["PhotoURL"].ToString(),
                   
                };
            }

            // لو مفيش user، ممكن ترجعي null أو ترمي Exception
            return null;
        }

        public void UpdateUserProfile(UserProfile profile)
        {
            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_UpsertUserProfile", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UserID", profile.UserID);
            cmd.Parameters.AddWithValue("@UserName", (object?)profile.UserName ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@Bio", (object?)profile.Bio ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@PhotoURL", (object?)profile.PhotoUrl ?? DBNull.Value);

            con.Open();
            cmd.ExecuteNonQuery();
        }

        // ---------------- Enrollments ----------------
        public IEnumerable<Enrollment> GetUserEnrollments(long userId)
        {
            var result = new List<Enrollment>();

            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_GetUserEnrollments", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserID", userId);

            con.Open();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                result.Add(new Enrollment
                {
                    EnrollmentID = reader.GetInt64(reader.GetOrdinal("EnrollmentID")),
                    CourseID = reader.GetInt64(reader.GetOrdinal("CourseID")),
                    CourseTitle = reader["CourseTitle"]?.ToString() ?? "",  // هنا اسم الكورس
                    EnrollmentDate = reader.GetDateTime(reader.GetOrdinal("EnrollmentDate")),
                    ExpiryDate = reader.GetDateTime(reader.GetOrdinal("ExpiryDate")),
                    ProgressPercentage = (int)Convert.ToDouble(reader["ProgressPercentage"])
                });
            }

            return result;
        }

        // ---------------- Certificates ----------------
        public IEnumerable<Certificate> GetUserCertificates(long userId)
        {
            var result = new List<Certificate>();

            using var con = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            using var cmd = new SqlCommand("sp_GetUserCertificates", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserID", userId);

            con.Open();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                result.Add(new Certificate
                {
                    CertificateID = reader.GetInt64(reader.GetOrdinal("CertificateID")),
                    CourseID = reader.GetInt64(reader.GetOrdinal("CourseID")),
                    CourseTitle = reader["CourseTitle"]?.ToString() ?? "",
                    IssuedAt = reader.GetDateTime(reader.GetOrdinal("IssuedAt")),
                  
                    FileURL = reader["FileURL"]?.ToString() ?? ""
                });
            }

            return result;
        }
    }
}
