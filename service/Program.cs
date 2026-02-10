using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("public", new OpenApiInfo
    {
        Title = "API Pública",
        Version = "v1",
        Description = "Rutas visibles para el Frontend"
    });

    c.SwaggerDoc("private", new OpenApiInfo
    {
        Title = "API Interna",
        Version = "v1",
        Description = "Rutas Gateway-Service e Internas"
    });

    // Filtro para separar por carpeta o atributo
    c.DocInclusionPredicate((docName, apiDesc) =>
    {
        if (docName == "public")
            return apiDesc.RelativePath!.Contains("api/public");

        return true;
    });
});

builder.Services.AddRouting(options =>
{
    options.LowercaseUrls = true;
    options.LowercaseQueryStrings = true;
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapGet("/", () => "Servidor C# Funcionando");
}
else
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapOpenApi();
app.MapControllers();


app.Run();

/*
laupayero.nx.ars
*/