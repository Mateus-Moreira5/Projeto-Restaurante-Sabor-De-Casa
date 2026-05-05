using API.DTOs.ViaCep.UsuarioDto;

namespace API.Services.Interfaces;

public interface IUsuarioService
{
    Task<UsuarioResponseDto> RegistrarAsync(UsuarioRegistroDto dto);
    Task<UsuarioResponseDto> LoginAsync(UsuarioLoginDto dto);
}