using API.DTOs.PratoDTOs;

namespace API.Services.Interfaces;

public interface IPratoService
{
    Task<List<PratoResponseDto>> ListAllAsync();
    Task<PratoResponseDto?> GetByIdAsync(Guid id);
    Task<PratoResponseDto> CreateAsync(CriarPratoDto dto);
    Task<PratoResponseDto?> UpdateAsync(Guid id, AtualizarPratoDto dto);
    Task<bool> DeleteAsync(Guid id);
}