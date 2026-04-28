namespace API.DTOs.PratoDTOs;

public record CriarPratoDTO(
    string NomePrato,
    string Descricao,
    string InfoIngrediente,
    string Acompanhamento,
    decimal Preco
    );