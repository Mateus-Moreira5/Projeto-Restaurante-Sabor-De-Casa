namespace API.DTOs.PratoDTOs;

public record CriarPratoDto(
    string NomePrato,
    string Descricao,
    string InfoIngrediente,
    string Acompanhamento,
    string UrlImagem,
    decimal Preco
    );