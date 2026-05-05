namespace API.DTOs.ViaCep.UsuarioDto;

public record UsuarioResponseDto(
    Guid IdUsuario,
    string Email,
    string Token
    );