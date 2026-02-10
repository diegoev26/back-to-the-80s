var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();


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
