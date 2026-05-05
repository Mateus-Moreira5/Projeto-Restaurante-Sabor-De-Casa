using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.configuration;

public class UsuarioConfiguration : IEntityTypeConfiguration<UsuarioAdm>
{
    public void Configure(EntityTypeBuilder<UsuarioAdm> builder)
    {
        builder.ToTable("UsuariosAdm");
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Email).IsRequired();
        builder.HasIndex(u => u.Email).IsUnique();
        builder.Property(u => u.Senha).IsRequired();
    }
}