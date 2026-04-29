using API.DTOs.PratoDTOs;

namespace API.Services.Interfaces;

public interface IPratoService
{
    Task<List<PratoResponseDTO>> ListAllAsync();
    Task<PratoResponseDTO?> GetByIdAsync(Guid id);
    Task<PratoResponseDTO> CreateAsync(CriarPratoDTO dto);
    Task<PratoResponseDTO?> UpdateAsync(Guid id, AtualizarPratoDTO dto);
    Task<bool> DeleteAsync(Guid id);
}