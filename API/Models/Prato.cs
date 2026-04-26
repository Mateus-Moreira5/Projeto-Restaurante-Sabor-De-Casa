namespace API.Models;

public class Prato
{
    public Guid IdPrato { get; set; }
    public required string NomePrato { get; set; }
    public string? Descricao { get; set; }
    public required string InfoIngredientes { get; set; }
    public required string Acompanhamentos { get; set; }
    public decimal Preco { get; set; }
    public bool Disponivel { get; set; }

    public Prato(){ }

    public Prato (string nomePrato, string? descricao, string infoIngredientes, string acompanhamentos, decimal preco)
    {
        IdPrato = Guid.NewGuid();
        NomePrato = nomePrato;
        Descricao = descricao;
        InfoIngredientes = infoIngredientes;
        Acompanhamentos = acompanhamentos;
        Preco = preco;
        Disponivel = true;
    }
}