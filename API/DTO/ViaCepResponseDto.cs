using System.Text.Json.Serialization;

namespace API.DTOs.ViaCep;

public record ViaCepResponseDto(
    [property: JsonPropertyName("cep")] string Cep,
    [property: JsonPropertyName("logradouro")] string Logradouro,
    [property: JsonPropertyName("bairro")] string Bairro,
    [property: JsonPropertyName("localidade")] string Cidade,
    [property: JsonPropertyName("uf")] string Estado,
    [property: JsonPropertyName("erro")] bool Erro
);