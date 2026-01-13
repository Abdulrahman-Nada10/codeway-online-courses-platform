using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace GlobalResponse.Shared.Configuration;

public class LocalizedMessageService
{
    private readonly string _connectionString;

    public LocalizedMessageService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Missing DefaultConnection");
    }

    public async Task<string> GetMessageAsync(string errorKey, string languageCode = "en")
    {
        try
        {
            using var connection = new SqlConnection(_connectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@ErrorKey", errorKey);
            parameters.Add("@LanguageCode", languageCode);

            var result = await connection.ExecuteScalarAsync<string>(
                "SELECT dbo.fn_GetErrorMessage(@ErrorKey, @LanguageCode)",
                parameters,
                commandType: CommandType.Text
            );

            return result ?? errorKey; // fallback
        }
        catch
        {
            return errorKey;
        }
    }
}
