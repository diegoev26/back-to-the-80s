using Microsoft.AspNetCore.Mvc;
using service.Classes;

namespace service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpPost]
    public IActionResult Test([FromBody] ApiRequest<object> request)
    {

        var response = new ApiResponse<object, string, object>
        {
            Code = 200,
            Response = new ResponseData<object, object>
            {
                Message = "Integración exitosa",
                Data = new { info = "Servidor C# recibió tu JSON" }
            }
        };

        return Ok(response);
    }

    [HttpGet]
    public IActionResult GetTest()
    {
        return Ok(new { message = "El controlador Test está activo" });
    }
}