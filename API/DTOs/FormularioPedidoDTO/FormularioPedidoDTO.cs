namespace API.DTOs.FormularioPedidoDTO;

public record FormularioPedidoDTO(
    string Nome,
    string Telafone,
    string TipoPagamento,
    string TipoEntrega,
    string? Cep,
    string? Logradouro,
    string? Numero,
    string? Bairro,
    string? Complemento
    );