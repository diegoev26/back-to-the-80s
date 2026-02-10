using Microsoft.AspNetCore.Mvc;
using service.Models;

namespace service.Controllers;

[ApiController]
[Route("api/[controller]")]

public class TestController : ControllerBase
{
    [HttpPost]
    public IActionResult Test()
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