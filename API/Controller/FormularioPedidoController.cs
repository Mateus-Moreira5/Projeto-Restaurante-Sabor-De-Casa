using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/formularios")]
public class FormularioPedidoController(IFormularioPedidoService formularioPedidoService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> ListAllAsync()
    {
        var formularios = await formularioPedidoService.ListAllAsync();
        return Ok(formularios);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(Guid id)
    {
        var formulario = await formularioPedidoService.GetById(id);
        if (formulario is null) return NotFound();
        return Ok(formulario);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        var deletado = await formularioPedidoService.DeleteAsync(id);
        if (!deletado) return NotFound();
        return NoContent();
    }
}