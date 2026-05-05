using API.DTOs.Pedido;

namespace API.Services.Interfaces;

public interface IPedidoService
{
    Task<List<PedidoResponseDto>> ListAllAsync();
    Task<PedidoResponseDto?> GetByIdAsync(Guid id);
    Task<List<PedidoResponseDto>> CreateAsync(PedidoCompletoCreateDto dto);
    Task<bool> DeleteAsync(Guid id);
}