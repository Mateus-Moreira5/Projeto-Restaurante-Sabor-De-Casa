namespace API.Models;

public class Pedido
{
    public Guid IdPedido { get; set; }
    public Guid FkCodigoPedido { get; set; }
    public Guid FkIdPrato { get; set; }
    public int Quantidade { get; set; }
    public string? Personalizacao { get; set; }

    public FormularioPedido? FormularioPedido { get; set; }
    public Prato? Prato { get; set; }
    public Pedido() {}

    public Pedido(Guid fkCodigoPedido, Guid fkIdPrato, int quantidade, string? personalizacao, FormularioPedido? formularioPedido, Prato? prato)
    {
        IdPedido = Guid.NewGuid();
        FkCodigoPedido = fkCodigoPedido;
        FkIdPrato = fkIdPrato;
        Quantidade = quantidade;
        Personalizacao = personalizacao;
    }
}