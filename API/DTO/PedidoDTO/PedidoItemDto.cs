namespace API.DTOs.Pedido;

public record PedidoItemDto(
    Guid FkIdPrato,
    int Quantidade,
    string? Personalizacao
);