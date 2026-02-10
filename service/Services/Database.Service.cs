using Microsoft.Data.SqlClient;
using System.Data;

namespace service.Services;

public class DbService
{
    private readonly IConfiguration _config;

    public DbService(IConfiguration configuration)
    {
        _config = configuration;
    }

    public IDbConnection CreateConnection()
    {
        // 1. Intentar leer de variables de entorno directamente
        string? server = Environment.GetEnvironmentVariable("SQL_SERVER");
        string? db = Environment.GetEnvironmentVariable("SQL_DB");

        // 2. Si no existen, podrías tomarlos de otro lado o lanzar error
        if (string.IsNullOrEmpty(server) || string.IsNullOrEmpty(db))
        {
            throw new Exception("Faltan las variables de entorno SQL_SERVER o SQL_DB");
        }

        // 3. Construir la cadena dinámicamente o reemplazar en la base
        var baseConn = _config.GetConnectionString("SqlConnectionString")!;
        var finalConn = baseConn
            .Replace("{SQL_SERVER}", server)
            .Replace("{SQL_DB}", db);

        return new SqlConnection(finalConn);
    }
}