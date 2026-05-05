using API.DTOs.ViaCep.UsuarioDto;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller;

[ApiController]
[Route("api/auth")]
public class UsuarioController(IUsuarioService usuarioService) : ControllerBase
{
    [HttpPost("registrar")]
    public async Task<IActionResult> RegistrarAsync(UsuarioRegistroDto dto)
    {
        var resultado = await usuarioService.RegistrarAsync(dto);
        return Ok(resultado);
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync(UsuarioLoginDto dto)
    {
        var resultado = await usuarioService.LoginAsync(dto);
        return Ok(resultado);
    }
}