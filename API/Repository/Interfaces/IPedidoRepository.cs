using API.Models;

namespace API.Repository.Interfaces;

public interface IPedidoRepository
{
    Task<Pedido?> GetByIdAsync(Guid id);
    Task<List<Pedido>> ListAllAsync();
    Task<Pedido> CreateAsync(Pedido pedido);
    Task<bool> Delete(Guid id);
}