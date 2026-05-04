namespace API.DTOs.PedidoDTO;

public record PedidoResponseDto(
    Guid IdPedido,
    Guid FkCodigoPedido,
    Guid FkIdPrato,
    int Quantidade,
    string? Personalizacao
    );