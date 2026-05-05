using System.Diagnostics.CodeAnalysis;

namespace API.Models;

public class UsuarioAdm
{
    public Guid Id { get; set; }
    public required string Email { get; set; }
    public required string Senha { get; set; }
    public UsuarioAdm() { }

    [SetsRequiredMembers]
    public UsuarioAdm(string email, string senha)
    {
        Id = Guid.NewGuid();
        Email = email;
        Senha = BCrypt.Net.BCrypt.HashPassword(senha);
    }
}