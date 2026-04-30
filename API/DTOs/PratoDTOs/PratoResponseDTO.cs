namespace API.DTOs.PratoDTOs;

public record PratoResponseDTO(
    Guid IdPrato,
    string NomePrato,
    string Descricao,
    string InfoIngredientes, 
    string Acompanhamentos,
    string UrlFoto,
    decimal Preco,
    bool Disponivel
    );