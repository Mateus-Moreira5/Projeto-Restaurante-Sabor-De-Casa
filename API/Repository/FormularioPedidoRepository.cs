using API.Data;
using API.Models;
using API.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class FormularioPedidoRepository(AppDbContext context) : IFormularioPedidoRepository
{
    public async Task<FormularioPedido?> GetByIdAsync(Guid id)
    {
        return await context.FormulariosPedido.FindAsync(id);
    }

    public async Task<List<FormularioPedido>> ListAllAsync()
    {
        return await context.FormulariosPedido.ToListAsync();
    }

    public async Task<FormularioPedido> CreateAsync(FormularioPedido formularioPedido)
    {
        context.FormulariosPedido.Add(formularioPedido);
        await context.SaveChangesAsync();
        return formularioPedido;
    }

    public async Task<FormularioPedido?> UpdateAsync(Guid id, FormularioPedido formularioPedido)
    {
        throw new NotImplementedException();
    }

    public async Task<FormularioPedido?> UpdateAsync(FormularioPedido formularioPedido)
    {
        context.FormulariosPedido.Update(formularioPedido);
        await context.SaveChangesAsync();
        return formularioPedido;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var formulario = await GetByIdAsync(id);
        if (formulario is null) return false;
        context.FormulariosPedido.Remove(formulario);
        await context.SaveChangesAsync();
        return true;
    }
}