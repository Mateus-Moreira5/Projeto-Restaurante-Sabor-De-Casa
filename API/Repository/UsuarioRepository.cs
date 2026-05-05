using API.Data;
using API.Migrations;
using API.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using ModelUsuario = API.Models.Usuario;

namespace API.Repository;

public class UsuarioRepository(AppDbContext context) : IUsuarioRepository
{
    public async Task<ModelUsuario?> GetByEmailAsync(string email)
    {
        return await context.UsuarioAdm
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<ModelUsuario> CreateAsync(ModelUsuario usuario)
    { 
        context.UsuarioAdm.Add(usuario);
        await context.SaveChangesAsync();
        return usuario;
    }
}