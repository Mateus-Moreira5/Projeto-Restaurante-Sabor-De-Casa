using API.DTOs.PedidoDTO;

namespace API.Services.Interfaces;

public interface IPedidoService
{
    Task<List<PedidoResponseDTO>> ListAllAsync();
    Task<PedidoResponseDTO> GetByIdAsync(Guid id);
    Task<PedidoResponseDTO> CreateAsync(PedidoCreateDTO dto);
    Task<bool> DeleteAsync(Guid id);
}