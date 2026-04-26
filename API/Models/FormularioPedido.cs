namespace API.Models;

public class FormularioPedido
{
    public Guid CodigoPedido { get; set; }
    public required string Nome { get; set; }
    public required string Telefone { get; set; }
    public required string TipoPagamento { get; set; }
    public required string TipoEntrega { get; set; }
    public string? Cep { get; set; }
    public string? Logradouro { get; set; }
    public string? Numero { get; set; }
    public string? Bairro { get; set; }
    public string? Complemento { get; set; }
    
    public FormularioPedido() { }

    public FormularioPedido(string nome, string telefone, string tipoPagamento, string tipoEntrega, string? cep, string? logradouro, string? numero, string? bairro, string? complemento)
    {
        CodigoPedido = Guid.NewGuid();
        Nome = nome;
        Telefone = telefone;
        TipoPagamento = tipoPagamento;
        TipoEntrega = tipoEntrega;
        Cep = cep;
        Logradouro = logradouro;
        Numero = numero;
        Bairro = bairro;
        Complemento = complemento;
    }
}   