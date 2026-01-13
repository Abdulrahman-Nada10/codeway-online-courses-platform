using Azure.Core;
using OnlineCourseSystem.Auth.DTOs;
using OnlineCourseSystem.Auth.Helper;
using OnlineCourseSystem.Auth.Infrastructure;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace OnlineCourseSystem.Auth.Services
{
    public class AuthService(PasswordValidationHelper passwordValidation, IPepperProvider pepper, IJwtService jwt, IConfiguration configuration) : IAuthService
    {
        private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Missing connection string");
        private readonly IJwtService _jwt = jwt;
        private readonly IPepperProvider _pepper = pepper;
        private readonly PasswordValidationHelper _passwordValidation = passwordValidation;

        public async Task<AuthResponse> ChangePasswordAsync(ChangePasswordRequest request, string languageCode = "ar")
        {
            try
            {
                var oldPasswordWithPepper = request.OldPassword + _pepper.Pepper;
                var newPasswordWithPepper = request.NewPassword + _pepper.Pepper;

                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var parameters = new DynamicParameters();
                parameters.Add("@UserId", request.UserId);
                parameters.Add("@OldPassword", oldPasswordWithPepper);
                parameters.Add("@NewPassword", newPasswordWithPepper);
                parameters.Add("@LangCode", languageCode);

                var result = await connection.QueryFirstOrDefaultAsync<AuthResponse>(
                    "Asp_User_ChangePassword",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return result!;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error logout: {ex.Message}", ex);
            }
        }

        public IUserRegistrationStrategy GetStrategy(string roleName) => roleName.ToLower() switch
        {
            "admin" => new AdminRegistrationStrategy(_connectionString, _passwordValidation, _pepper),
            "server" => new ServerRegistrationStrategy(_connectionString, _passwordValidation, _pepper),
            _ => new MemberRegistrationStrategy(_connectionString, _passwordValidation, _pepper)
        };

        public async Task<LoginResponse> LoginAsync(LoginRequestDto dto, string languageCode = "ar")
        {
            try
            {
                var passwordWithPepper = dto.Password + _pepper.Pepper;

                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();

                parameters.Add("@Email", dto.Email);
                parameters.Add("@Password", passwordWithPepper);
                parameters.Add("@LanguageCode", languageCode);

                var result = await connection.QueryFirstOrDefaultAsync<LoginResponse>(
                "Asp_User_Login",
                parameters,
                commandType: CommandType.StoredProcedure);

                if (result!.UserId > 0)
                {
                    result.AccessToken = _jwt.GenerateAccessToken(result.UserId);
                }
                return result;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error login: {ex.Message}", ex);
            }
        }

        public async Task<AuthResponse> LogoutAsync(AuthRequestDto request, string languageCode = "ar")
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var parameters = new DynamicParameters();
                parameters.Add("@RefreshToken", request.RefreshToken);
                parameters.Add("@LanguageCode", languageCode);

                var result = await connection.QueryFirstOrDefaultAsync<dynamic>(
                    "Asp_User_Logout",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return result!;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error logout: {ex.Message}", ex);
            }
        }

        public async Task<RefreshTokenResponse> RefreshTokenAsync(AuthRequestDto request, string languageCode = "ar")
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var parameters = new DynamicParameters();
                parameters.Add("@RefreshToken", request.RefreshToken);
                parameters.Add("@LanguageCode", languageCode);

                var result = await connection.QueryFirstOrDefaultAsync<RefreshTokenResponse>(
                    "Asp_User_RefreshToken",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                if(result!.Success == 1)
                    result.AccessToken = _jwt.GenerateAccessToken((long)result.UserId);

                return result;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error refresh Token: {ex.Message}", ex);
            }
        }

        public async Task<AuthResponse> UpdateUserAsync(UpdateUserRequest request, string languageCode = "ar")
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var parameters = new DynamicParameters();
                parameters.Add("@UserId", request.UserId);
                parameters.Add("@UserName", request.UserName);
                parameters.Add("@Email", request.Email);
                parameters.Add("@PhoneNumber", request.PhoneNumber);
                parameters.Add("@LangCode", languageCode);

                var result = await connection.QueryFirstOrDefaultAsync<AuthResponse>(
                    "Asp_User_Update",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return result!;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error update user: {ex.Message}", ex);
            }
        }
    }
}
