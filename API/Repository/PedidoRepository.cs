using API.Data;
using API.Models;
using API.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class PedidoRepository(AppDbContext context) : IPedidoRepository
{
    public async Task<Pedido?> GetByIdAsync(Guid id)
    {
        return await context.ItensPedido.FindAsync(id);
    }

    public async Task<List<Pedido>> ListAllAsync()
    {
        return await context.ItensPedido.ToListAsync();
    }

    public async Task<Pedido> CreateAsync(Pedido pedido)
    {
        context.ItensPedido.Add(pedido);
        await context.SaveChangesAsync();
        return pedido;
    }
    
    public async Task<bool> Delete(Guid id)
    {
        var pedido = await GetByIdAsync(id);
        if (pedido is null) return false;
        context.ItensPedido.Remove(pedido);
        await context.SaveChangesAsync();
        return true;
    }
}