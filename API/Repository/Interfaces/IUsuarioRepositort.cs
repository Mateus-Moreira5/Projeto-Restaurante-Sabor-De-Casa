using API.Models;

namespace API.Repository.Interfaces;

public interface IUsuarioRepository
{
    Task<UsuarioAdm?> GetByEmailAsync(string email);
    Task<UsuarioAdm> CreateAsync(UsuarioAdm usuarioAdm);
}