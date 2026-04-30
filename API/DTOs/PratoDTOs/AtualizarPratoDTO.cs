namespace API.DTOs.PratoDTOs;

public record AtualizarPratoDTO( 
    string? NomePrato,
    string? Descricao,
    string? InfoIngrediente,
    string? Acompanhamento,
    string UrlImagem,
    decimal? Preco,
    bool? Disponivel 
    );