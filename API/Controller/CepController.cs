using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/cep")]
public class CepController(ViaCepService viaCepService) : ControllerBase
{
    [HttpGet("{cep}")]
    public async Task<IActionResult> BuscarEnderecoAsync(string cep)
    {
        var endereco = await viaCepService.BuscarEnderecoAsync(cep);
        if (endereco is null) return NotFound("CEP não encontrado.");
        return Ok(endereco);
    }
}