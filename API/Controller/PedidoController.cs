using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller;

[ApiController]
[Route("api/pedidos")]
public class PedidoController ( IPedidoService pedidoService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> ListAllAsync()
    {
        var pedido = await pedidoService.ListAllAsync();
        return Ok(pedido);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var pedido = await pedidoService.GetByIdAsync(id);
        if (pedido == null) return NotFound();
        return Ok(pedido);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAsync(PedidoCompletoCreateDto dto)
    {
        var pedido = await pedidoService.CreateAsync(dto);
        return Ok(pedido);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        var deletado = await pedidoService.DeleteAsync(id);
        if (!deletado) return NotFound();
        return NoContent();
    }
}