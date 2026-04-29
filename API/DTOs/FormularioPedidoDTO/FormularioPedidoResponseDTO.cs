namespace API.DTOs.FormularioPedidoDTO;

public record FormularioPedidoResponseDTO(
    Guid CodigoPedido,
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