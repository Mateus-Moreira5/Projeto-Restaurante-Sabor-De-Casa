using System.Diagnostics.CodeAnalysis;

namespace API.Models;

public class Usuario
{
    public Guid Id { get; set; }
    public required string Email { get; set; }
    public required string Senha { get; set; }
    public Usuario() { }

    [SetsRequiredMembers]
    public Usuario(string email, string senha)
    {
        Id = Guid.NewGuid();
        Email = email;
        Senha = BCrypt.Net.BCrypt.HashPassword(senha);
    }
}