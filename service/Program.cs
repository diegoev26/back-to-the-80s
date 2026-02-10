var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

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
