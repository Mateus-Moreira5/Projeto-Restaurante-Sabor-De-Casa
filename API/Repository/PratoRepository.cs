using API.Data;
using API.Models;
using API.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class PratoRepository(AppDbContext context) : IPratoRepository
{
    public async Task<List<Prato>> ListAllAsync()
    {
        return await context.Pratos.ToListAsync();
    }

    public async Task<Prato?> GetByIdAsync(Guid id)
    {
        return await context.Pratos.FindAsync(id);
    }

    public async Task<Prato> CreateAsync(Prato prato)
    {
        context.Pratos.Add(prato);
        await context.SaveChangesAsync();
        return prato;
    }

    public async Task<Prato?> UpdateAsync(Prato prato)
    {
        context.Pratos.Update(prato);
        await context.SaveChangesAsync();
        return prato;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var prato = await GetByIdAsync(id);
        if (prato == null) return false;
        context.Pratos.Remove(prato);
        await context.SaveChangesAsync();
        return true;
    }
}