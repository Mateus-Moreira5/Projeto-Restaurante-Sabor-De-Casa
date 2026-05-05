using API.Data;
using API.Migrations;
using API.Models;
using API.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class UsuarioRepository(AppDbContext context) : IUsuarioRepository
{
    public async Task<UsuarioAdm?> GetByEmailAsync(string email)
    {
        return await context.UsuarioAdm
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<UsuarioAdm> CreateAsync(UsuarioAdm usuarioAdm)
    { 
        context.UsuarioAdm.Add(usuarioAdm);
        await context.SaveChangesAsync();
        return usuarioAdm;
    }
}