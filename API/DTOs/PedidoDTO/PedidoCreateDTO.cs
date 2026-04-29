namespace API.DTOs.PedidoDTO;

public record PedidoCreateDTO(
    Guid FkCodigoPedido,
    Guid FkIdPrato,
    int Quantidade,
    string? Personalidade
    );