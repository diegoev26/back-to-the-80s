using System.Text.Json.Serialization;

namespace service.Classes;

public record ApiRequest<T>(T Data);

public class ResponseData<D, R>
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public D? Data { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Message { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public R? Reference { get; set; }
}

public class ApiResponse<T, E, R>
{
    public int Code { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public ResponseData<T, R>? Response { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public ResponseData<E, R>? Error { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public R? Reference { get; set; }
}