using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.configuration;

public class PedidoConfiguration : IEntityTypeConfiguration<Pedido>
{
    public void Configure(EntityTypeBuilder<Pedido> builder)
    {
        builder.HasKey(p => p.IdPedido);
        builder.HasOne(p => p.FormularioPedido).WithMany()
            .HasForeignKey(p => p.FkCodigoPedido);
        builder.HasOne(p => p.Prato).WithMany()
            .HasForeignKey(p => p.FkIdPrato);
        builder.Property(p => p.Quantidade).IsRequired();
        builder.Property(p => p.Quantidade);
    }
}