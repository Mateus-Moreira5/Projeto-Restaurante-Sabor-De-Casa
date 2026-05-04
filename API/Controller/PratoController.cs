using API.DTOs.PratoDTOs;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller;

[ApiController]
[Route("/pratos")]
public class PratoController(IPratoService pratoService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> ListAllAsync()
    {
        var prato = await pratoService.ListAllAsync();
        return Ok(prato);
    }

    [HttpGet("{id}")]
    [ActionName("GetByIdAsync")]
    public async Task<IActionResult> GetByIdAsync(Guid id)
    {
        var prato = await pratoService.GetByIdAsync(id);
        if (prato == null) return NotFound();
        return Ok(prato);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAsync(CriarPratoDto dto)
    { 
        var criado = await pratoService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetByIdAsync), new { id = criado.IdPrato }, criado);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAsync(Guid id, AtualizarPratoDto dto)
    {
        var atualizado = await pratoService.UpdateAsync(id, dto);
        if (atualizado is null) return NotFound();
        return Ok(atualizado);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        var deletado = await pratoService.DeleteAsync(id);
        if (!deletado) return NotFound();
        return NoContent();
    }
}