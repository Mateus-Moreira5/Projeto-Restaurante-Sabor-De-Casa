using API.Models;

namespace API.Repository.Interfaces;

public interface IUsuarioRepository
{
    Task<Usuario?> GetByEmailAsync(string email);
    Task<Usuario> CreateAsync(Usuario usuario);
}