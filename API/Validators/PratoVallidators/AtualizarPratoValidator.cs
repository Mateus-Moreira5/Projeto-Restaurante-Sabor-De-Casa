using System.Data;
using API.DTOs.PratoDTOs;
using FluentValidation;

namespace API.Validators;

public class AtualizarPratoValidator : AbstractValidator<AtualizarPratoDto>
{
    public AtualizarPratoValidator()
    {
        RuleFor(p => p.NomePrato)
            .MaximumLength(30).WithMessage("O nome tem que ter no máximo 30 carácteres.")
            .When(p => p.NomePrato is not null);

        RuleFor(p => p.Preco)
            .GreaterThan(0).WithMessage("O preço tem que ser maior que 0.")
            .When(p => p.Preco is not null);

        RuleFor(p => p.UrlImagem)
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
            .When(p => !string.IsNullOrEmpty(p.UrlImagem))
            .WithMessage("URL inválida.");
    }
}