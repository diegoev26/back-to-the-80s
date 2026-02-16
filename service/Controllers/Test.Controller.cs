using Microsoft.AspNetCore.Mvc;
using service.Classes;

namespace service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpPost]
    // 1. Le decimos que el éxito devuelve un ApiResponse con objetos
    [ProducesResponseType(typeof(ApiResponse<object, string, object>), 200)]
    // 2. Le decimos que el error (400) también sigue esa estructura
    [ProducesResponseType(typeof(ApiResponse<object, string, object>), 400)]
    public IActionResult Test([FromBody] ApiRequest<object> request)
    {
        if (request == null || request.Data == null)
        {
            var err = new ApiResponse<object, string, object>
            {
                Code = 400,
                Error = new ResponseData<string, object>
                {
                    Message = "Faltan datos necesarios"
                }
            };
            return BadRequest(err);
        }
        var res = new ApiResponse<object, string, object>
        {
            Code = 200,
            Response = new ResponseData<object, object>
            {
                Message = "Integración exitosa",
                Data = new { info = "Servidor C# recibió tu JSON" }
            }
        };

        return Ok(res);
    }

    [HttpGet]
    public IActionResult GetTest()
    {
        return Ok(new { message = "El controlador Test está activo" });
    }

}