using API.DTOs.PedidoDTO;

namespace API.Services.Interfaces;

public interface IPedidoService
{
    Task<List<PedidoResponseDto>> ListAllAsync();
    Task<PedidoResponseDto> GetByIdAsync(Guid id);
    Task<PedidoResponseDto> CreateAsync(PedidoCreateDto dto);
    Task<bool> DeleteAsync(Guid id);
}