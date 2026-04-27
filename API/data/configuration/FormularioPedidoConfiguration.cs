using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using API.Models;

namespace API.Data.configuration;

public class FormularioPedidoConfiguration : IEntityTypeConfiguration<FormularioPedido>
{
    public void Configure(EntityTypeBuilder<FormularioPedido> builder)
    {
        builder.HasKey(p => p.CodigoPedido);
        builder.Property(p => p.Nome).HasMaxLength(35).IsRequired();
        builder.Property(p => p.Telefone).HasMaxLength(12).IsRequired();
        builder.Property(p => p.TipoPagamento).IsRequired();
        builder.Property(p => p.TipoEntrega).IsRequired();
        builder.Property(p => p.Cep).HasMaxLength(8);
        builder.Property(p => p.Logradouro);
        builder.Property(p => p.Numero);
        builder.Property(p => p.Bairro);
        builder.Property(p => p.Complemento);
    }
}