using API.Models;

namespace API.Repository.Interfaces;

public interface IFormularioPedidoRepository
{
    Task<FormularioPedido?> GetByIdAsync(Guid id);
    Task<List<FormularioPedido>> ListAllAsync();
    Task<FormularioPedido> CreateAsync(FormularioPedido formularioPedido);
    Task<FormularioPedido?> UpdateAsync(FormularioPedido formularioPedido);
    Task<bool> DeleteAsync(Guid id);
}