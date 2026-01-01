using OnlineCourseSystem.Auth.DTOs;
using OnlineCourseSystem.Auth.Helper;
using OnlineCourseSystem.Auth.Infrastructure;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace OnlineCourseSystem.Auth.Services
{
    public abstract class UserRegistrationStrategy(string connectionString, PasswordValidationHelper passwordValidator, IPepperProvider pepperProvider) : IUserRegistrationStrategy
    {
        protected readonly string _connectionString = connectionString;
        protected readonly PasswordValidationHelper _passwordValidator = passwordValidator;
        protected readonly IPepperProvider _pepperProvider = pepperProvider;

        protected abstract string RoleName { get; }
        protected abstract bool IsActiveDefault { get; }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request, string languageCode = "ar")
        {
            try
            {
                // تحقق من قوة كلمة المرور
                if (!_passwordValidator.Validate(request.Password, out string error, languageCode))
                    throw new Exception(error);

                // دمج كلمة المرور مع Pepper
                var combinedPassword = request.Password + _pepperProvider.Pepper;

                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var parameters = new DynamicParameters();
                parameters.Add("@UserName", request.UserName);
                parameters.Add("@Email", request.Email);
                parameters.Add("@PhoneNumber", request.PhoneNumber);
                parameters.Add("@Password", combinedPassword);
                parameters.Add("@RoleName", RoleName); // "Server"
                parameters.Add("@LangCode", languageCode);
                parameters.Add("@IsActive", IsActiveDefault);

                var result = await connection.QueryFirstOrDefaultAsync<AuthResponse>(
                    "Asp_User_Register",
                    parameters,
                    commandType: CommandType.StoredProcedure);

                return result!;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching user roles: {ex.Message}", ex);
            }
        }
    }
}
