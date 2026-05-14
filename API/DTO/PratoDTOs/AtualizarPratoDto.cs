namespace API.DTOs.PratoDTOs;

public record AtualizarPratoDto( 
    string? NomePrato,
    string? Descricao,
    string? InfoIngrediente,
    string? Acompanhamento,
    string? UrlImagem,
    decimal? Preco,
    bool? Disponivel 
    );