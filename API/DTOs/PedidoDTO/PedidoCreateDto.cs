namespace API.DTOs.PedidoDTO;

public record PedidoCreateDto(
    Guid FkCodigoPedido,
    Guid FkIdPrato,
    int Quantidade,
    string? Personalizacao
    );