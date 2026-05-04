namespace API.DTOs.PratoDTOs;

public record PratoResponseDto(
    Guid IdPrato,
    string NomePrato,
    string Descricao,
    string InfoIngredientes, 
    string Acompanhamentos,
    string UrlFoto,
    decimal Preco,
    bool Disponivel
    );