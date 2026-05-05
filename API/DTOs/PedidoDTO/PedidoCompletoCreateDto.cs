using API.DTOs.Pedido;

public record PedidoCompletoCreateDto(
    string Nome,
    string Telefone,
    string TipoPagamento,
    string TipoEntrega,
    string? Cep,
    string? Logradouro,
    string? Numero,
    string? Bairro,
    string? Complemento,
    List<PedidoItemDto> Itens
);