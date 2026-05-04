using System.Data;
using API.DTOs.PratoDTOs;
using FluentValidation;

namespace API.Validators;

public class CriarPratoValidator : AbstractValidator<CriarPratoDTO>
{
    public CriarPratoValidator()
    {
        RuleFor(p => p.NomePrato)
            .NotEmpty().WithMessage("Nome do prato obrigatório.")
            .MaximumLength(30).WithMessage("O nome tem que ter no máximo 30 carácteres.");

        RuleFor(p => p.Descricao)
            .NotEmpty().WithMessage("Descrição obrigatório.");

        RuleFor(p => p.InfoIngrediente)
            .NotEmpty().WithMessage("Informações do ingredientes obrigatórias.");

        RuleFor(p => p.Acompanhamento)
            .NotEmpty().WithMessage("Os acompanhamentos são obrigatórios.");

        RuleFor(p => p.UrlImagem)
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
            .When(x => x.UrlImagem is not null)
            .WithMessage("Url inválida");
        
        RuleFor(p => p.Preco)
            .GreaterThan(0).WithMessage("Valor inválido.");
    }
}