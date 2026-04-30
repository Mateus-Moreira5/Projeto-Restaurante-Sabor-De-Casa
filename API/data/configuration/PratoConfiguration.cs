using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.configuration;

public class PratoConfiguration : IEntityTypeConfiguration<Prato>
{
    public void Configure(EntityTypeBuilder<Prato> builder)
    {
        builder.HasKey(p => p.IdPrato);
        builder.Property(p => p.NomePrato).HasMaxLength(35).IsRequired();
        builder.Property(p => p.Descricao);
        builder.Property(p => p.InfoIngredientes).IsRequired();
        builder.Property(p => p.Acompanhamentos);
        builder.Property(p => p.Preco).HasColumnType("decimal(8,2)").IsRequired();
        builder.Property(p => p.Disponivel).IsRequired();
        builder.Property(p => p.UrlImagem);
    }
}