using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto dto)
    {
        if (dto.Username == "admin" && dto.Password == "123")
        {
            var token = _authService.GenerateToken(dto.Username);
            return Ok(new { Token = token });
        }
        return Unauthorized();
    }
}

public class LoginDto
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
