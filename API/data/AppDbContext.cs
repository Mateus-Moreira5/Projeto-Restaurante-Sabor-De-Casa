using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Prato> Pratos { get; set; }
    public DbSet<FormularioPedido> FormulariosPedido { get; set; }
    public DbSet<Pedido> ItensPedido { get; set; }
}
