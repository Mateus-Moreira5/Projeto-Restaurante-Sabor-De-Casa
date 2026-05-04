using API.DTOs.FormularioPedidoDTO;

namespace API.Services.Interfaces;

public interface IFormularioPedidoService
{
    Task<List<FormularioPedidoResponseDTO>> ListAllAsync();
    Task<FormularioPedidoResponseDTO?> GetById(Guid id);
    Task<FormularioPedidoResponseDTO> CreateAsync(FormularioPedidoCreateDTO dto);
    Task<FormularioPedidoResponseDTO> UpdateAsync(Guid id, FormularioPedidoCreateDTO dto);
    Task<bool> DeleteAsync(Guid id);
}