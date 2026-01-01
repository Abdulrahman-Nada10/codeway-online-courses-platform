using OnlineCourseSystem.Auth.DTOs.Permission;
using OnlineCourseSystem.Auth.DTOs.Role;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace OnlineCourseSystem.Auth.Services.Role
{
    public class RoleService(IConfiguration configuration) : IRoleService
    {
        private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Missing connection string");

        public async Task<RolesResponseDto> AssignRoleAsync(long requestUserId, AssignRoleRequest req, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();
                parameters.Add("@RequestUserId", requestUserId);
                parameters.Add("@UserId", req.UserId);
                parameters.Add("@RoleId", req.RoleId);
                parameters.Add("@LangCode", languageCode);

                var result = await connection.QueryFirstAsync<RolesResponseDto>(
                    "Asp_User_AssignRole",
                    parameters,
                    commandType: CommandType.StoredProcedure);

                return result;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error assigning role: {ex.Message}", ex);
            }
        }

        public async Task<RoleResponseDto> CreateAsync(RoleCreateRequest request, long userId, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                parameters.Add("@Name", request.Name);
                parameters.Add("@LanguageCode", languageCode);

                var result = await connection.QueryFirstOrDefaultAsync<RoleResponseDto>(
                    "Asp_Role_Create",
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
                throw new Exception($"Error creating role: {ex.Message}", ex);
            }
        }

        public async Task<RolesResponseDto> DeleteAsync(long requestUserId, long roleId, string languageCode = "ar")
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@RequestUserId", requestUserId);
                parameters.Add("@RoleId", roleId);
                parameters.Add("@LangCode", languageCode);

                await connection.OpenAsync();

                var result = await connection.QueryFirstOrDefaultAsync<RolesResponseDto>(
                    "Asp_Role_Delete",
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure
                );

                return result!;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting role: {ex.Message}", ex);
            }
        }

        public async Task<RoleResponseDto> GetRolesAsync(long requestUserId, string languageCode = "ar")
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();
                parameters.Add("@RequestUserId", requestUserId);
                parameters.Add("@LanguageCode", languageCode);

                await connection.OpenAsync();

                using var multi = await connection.QueryMultipleAsync(
                    "Asp_GetRoles",
                    parameters,
                    commandType: CommandType.StoredProcedure);

                // أول جدول: Success + Message
                var header = await multi.ReadFirstOrDefaultAsync<RoleResponseDto>();

                if (header!.Success != 1)
                    return header; // Unauthorized OR Empty

                // تاني جدول: Roles List
                var roles = await multi.ReadAsync<RoleDto>();

                header.Roles = roles;

                return header;
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

        public async Task<RoleResponseDto> GetUserRolesAsync(long userId, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                parameters.Add("@LanguageCode", languageCode);

                await connection.OpenAsync();

                var multi = await connection.QueryMultipleAsync(
                    "Asp_GetUserRoles",
                    parameters,
                    commandType: CommandType.StoredProcedure);

                // Read first result set: Success + Message
                var header = await multi.ReadFirstOrDefaultAsync<dynamic>();

                var response = new RoleResponseDto
                {
                    Success = (int)header!.Success,
                    Message = (string)header.Message,
                    Roles = []
                };

                // If success = 1 → read roles
                if (response.Success == 1)
                {
                    response.Roles = (await multi.ReadAsync<RoleDto>()).ToList();
                }

                return response;
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
