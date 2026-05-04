using API.DTOs.FormularioPedidoDTO;

namespace API.Services.Interfaces;

public interface IFormularioPedidoService
{
    Task<List<FormularioPedidoResponseDto>> ListAllAsync();
    Task<FormularioPedidoResponseDto?> GetById(Guid id);
    Task<FormularioPedidoResponseDto> CreateAsync(FormularioPedidoCreateDto dto);
    Task<FormularioPedidoResponseDto> UpdateAsync(Guid id, FormularioPedidoCreateDto dto);
    Task<bool> DeleteAsync(Guid id);
}