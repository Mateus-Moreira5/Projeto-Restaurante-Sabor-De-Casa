// DTOs/Pedido/PedidoResponseDto.cs
namespace API.DTOs.Pedido;

public record PedidoResponseDto(
    Guid IdPedido,
    string NomePrato,
    decimal PrecoPrato,
    string NomeCliente,
    string Telefone,
    string TipoEntrega,
    string TipoPagamento,
    int Quantidade,
    string? Personalizacao,
    bool Concluido,
    string? Cep,
    string? Logradouro,
    string? Numero,
    string? Bairro,
    string? Complemento
);