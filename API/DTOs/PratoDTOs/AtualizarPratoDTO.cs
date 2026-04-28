namespace API.DTOs.PratoDTOs;

public record AtualizarPratoDTO( 
    string? NomePrato,
    string? Descricao,
    string? InfoIngrediente,
    string? Acompanhamento,
    decimal? Preco,
    bool? Disponivel 
    );