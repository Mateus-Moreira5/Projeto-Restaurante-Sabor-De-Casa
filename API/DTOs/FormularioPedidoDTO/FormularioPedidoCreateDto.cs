namespace API.DTOs.FormularioPedidoDTO;

public record FormularioPedidoCreateDto(
    string Nome,
    string Telefone,
    string TipoPagamento,
    string TipoEntrega,
    string? Cep,
    string? Logradouro,
    string? Numero,
    string? Bairro,
    string? Complemento
    );