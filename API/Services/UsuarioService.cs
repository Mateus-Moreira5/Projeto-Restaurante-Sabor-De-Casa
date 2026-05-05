using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.DTOs.ViaCep.UsuarioDto;
using API.Repository.Interfaces;
using API.Services.Interfaces;
using API.Models;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class UsuarioService(IUsuarioRepository usuarioRepository, IConfiguration configuration) : IUsuarioService
{
    public async Task<UsuarioResponseDto> RegistrarAsync(UsuarioRegistroDto dto)
    {
        var existe = await usuarioRepository.GetByEmailAsync(dto.Email);
        if (existe != null) throw new Exception("Email ja cadastrado.");

        var usuario = new UsuarioAdm(dto.Email, dto.Senha);
        await usuarioRepository.CreateAsync(usuario);

        var token = GerarToken(usuario);
        return new UsuarioResponseDto(usuario.Id, usuario.Email, token);
    }

    public async Task<UsuarioResponseDto> LoginAsync(UsuarioLoginDto dto)
    {
        var usuario = await usuarioRepository.GetByEmailAsync(dto.Email);
        if (usuario is null || !BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.Senha))
        {
            throw new Exception("Email ou senha inválidos.");
        }

        var token = GerarToken(usuario);
        return new UsuarioResponseDto(usuario.Id, usuario.Email, token);
    }

    private string GerarToken(UsuarioAdm usuario)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
            new Claim(ClaimTypes.Email, usuario.Email)
        };

        var token = new JwtSecurityToken(
            issuer: configuration["Jwt:Issuer"],
            audience: configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(double.Parse(configuration["Jwt:ExpiracaoHoras"]!)),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}