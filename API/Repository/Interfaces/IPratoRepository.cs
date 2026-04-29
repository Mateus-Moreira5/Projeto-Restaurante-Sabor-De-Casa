using API.Models;

namespace API.Repository.Interfaces;

public interface IPratoRepository
{
    Task<List<Prato>> ListAllAsync();
    Task<Prato?> GetByIdAsync(Guid id);
    Task<Prato> CreateAsync(Prato prato);
    Task<Prato?> UpdateAsync(Prato prato);
    Task<bool> DeleteAsync(Guid id);
}