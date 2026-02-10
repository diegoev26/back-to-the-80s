using Microsoft.AspNetCore.Mvc;
using service.Models;

namespace service.Controllers;

[ApiController]
[Route("api/[controller]")]

public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Test([FromQuery] string data)
    {
        var response = new ApiResponse<object, string, object>
        {
            Code = 200,
            Response = new ResponseData<object, object>
            {
                Message = "OK"
            }
        };
        return Ok(response);
    }
}