namespace API.DTOs.PratoDTOs;

public record PratoResponseDTO(
    Guid IdPrato,
    string NomePrato,
    string Descricao,
    string InfoIngradientes, 
    string Acompanhamentos,
    decimal Preco,
    bool Disponivel
    );