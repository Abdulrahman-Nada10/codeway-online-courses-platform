using OnlineCourseSystem.Auth.DTOs.Permission;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace OnlineCourseSystem.Auth.Services.Permission
{
    public class PermissionService(IConfiguration configuration) : IPermissionService
    {
        private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Missing connection string");

        public async Task<PermissionDto> CreateAsync(PermissionCreateDto request, long userID, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();
                parameters.Add("@RequestUserId", userID);
                parameters.Add("@PermissionKey", request.PermissionKey);
                parameters.Add("@Description", request.Description);
                parameters.Add("@LanguageCode", languageCode);

                var result = await connection.QueryFirstOrDefaultAsync<PermissionDto>(
                    "Asp_Permission_Create",
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
                throw new Exception($"Error creating permission: {ex.Message}", ex);
            }
        }

        public async Task<List<PermissionByUserDto>> GetPermissionsByUserAsync(long userId)
        {
            try
            {

                using var connection = new SqlConnection(_connectionString);
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);

                await connection.OpenAsync();

                var permissions = await connection.QueryAsync<PermissionByUserDto>(
                    "Asp_GetPermissionsByUser",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return permissions.ToList();
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching permission: {ex.Message}", ex);
            }
        }

        public async Task<PermissionDto?> GetByIdAsync(long id, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();
                parameters.Add("@PermissionID", id);
                parameters.Add("@LanguageCode", languageCode);

                return await connection.QueryFirstOrDefaultAsync<PermissionDto>(
                    "Asp_Permission_GetByID",
                    parameters,
                    commandType: CommandType.StoredProcedure);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching permission: {ex.Message}", ex);
            }
        }

        public async Task<PermissionListDto> GetListAsync(long userID, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();
                parameters.Add("@RequestUserId", userID);
                parameters.Add("@LanguageCode", languageCode);

                await connection.OpenAsync();

                using var multi = await connection.QueryMultipleAsync(
                    "Asp_Permission_GetList",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                var response = new PermissionListDto
                {
                    // ---- ResultSet 1 → Message ----
                    Message = (await multi.ReadAsync<string>()).FirstOrDefault() ?? string.Empty,

                    // ---- ResultSet 2 → Permissions ----
                    Permissions = (await multi.ReadAsync<Permissions>()).ToList()
                };

                return response;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching permissions: {ex.Message}", ex);
            }
        }

        public async Task<bool> CheckUserPermissionAsync(long userId, string permissionKey)
        {
            using var connection = new SqlConnection(_connectionString);
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", userId);
            parameters.Add("@PermissionKey", permissionKey);

            await connection.OpenAsync();

            var result = await connection.QueryFirstOrDefaultAsync<int>(
                "Asp_CheckUserPermission",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return result == 1;
        }

        public async Task<PermissionDto> RemoveAsync(long requestUserId, long permissionId, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();
                parameters.Add("@RequestUserId", requestUserId);
                parameters.Add("@PermissionId", permissionId);
                parameters.Add("@LanguageCode", languageCode);

                var result = await connection.QueryFirstOrDefaultAsync<PermissionDto>(
                    "Asp_Permission_Remove",
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
                throw new Exception($"Error setting permission active: {ex.Message}", ex);
            }
        }

        public async Task<PermissionDto?> UpdateAsync(UpdatePermissionRequest request, long userID, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();
                parameters.Add("@PermissionID", request.Id);
                parameters.Add("@PermissionName", request.Name);
                parameters.Add("@Description", request.Description);
                parameters.Add("@UserID", userID);
                parameters.Add("@LanguageCode", languageCode);

                return await connection.QueryFirstOrDefaultAsync<PermissionDto>(
                    "Asp_Permission_Update",
                    parameters,
                    commandType: CommandType.StoredProcedure);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating permission: {ex.Message}", ex);
            }
        }

        public async Task<PermissionDto?> AssignPermissionAsync(long requestUserId, long roleId, long permissionId, string languageCode)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);

                var parameters = new DynamicParameters();
                parameters.Add("@RequestUserId", requestUserId);
                parameters.Add("@RoleId", roleId);
                parameters.Add("@PermissionId", permissionId);
                parameters.Add("@LanguageCode", languageCode);
                return await connection.QueryFirstOrDefaultAsync<PermissionDto>(
                    "Asp_Role_AssignPermission",
                    parameters,
                    commandType: CommandType.StoredProcedure);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error assigning permission: {ex.Message}", ex);
            }
        }
    }
}
