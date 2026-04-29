namespace API.DTOs.PedidoDTO;

public record PedidoResponseDTO(
    Guid IdPedido,
    Guid FkCodigoPedido,
    Guid FkIdPrato,
    int Quantidade,
    string? Personalizacao
    );