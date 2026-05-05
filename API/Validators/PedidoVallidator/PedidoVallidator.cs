using API.DTOs.Pedido;
using FluentValidation;

namespace API.Validators;

public class PedidoValidator : AbstractValidator<PedidoCompletoCreateDto>
{
    public PedidoValidator()
    {
        RuleFor(x => x.Nome)
            .NotEmpty().WithMessage("O nome é obrigatório.");

        RuleFor(x => x.Telefone)
            .NotEmpty().WithMessage("O telefone é obrigatório.")
            .MaximumLength(15).WithMessage("O telefone deve ter no máximo 15 caracteres.");

        RuleFor(x => x.TipoPagamento)
            .NotEmpty().WithMessage("O tipo de pagamento é obrigatório.");

        RuleFor(x => x.TipoEntrega)
            .NotEmpty().WithMessage("O tipo de entrega é obrigatório.")
            .Must(x => x == "delivery" || x == "retirada")
            .WithMessage("O tipo de entrega deve ser 'delivery' ou 'retirada'.");

        RuleFor(x => x.Cep)
            .NotEmpty().WithMessage("O CEP é obrigatório.")
            .MaximumLength(9).WithMessage("O CEP deve ter no máximo 9 caracteres.")
            .When(x => x.TipoEntrega == "delivery");

        RuleFor(x => x.Logradouro)
            .NotEmpty().WithMessage("O logradouro é obrigatório.")
            .When(x => x.TipoEntrega == "delivery");

        RuleFor(x => x.Numero)
            .NotEmpty().WithMessage("O número é obrigatório.")
            .When(x => x.TipoEntrega == "delivery");

        RuleFor(x => x.Bairro)
            .NotEmpty().WithMessage("O bairro é obrigatório.")
            .When(x => x.TipoEntrega == "delivery");

        RuleFor(x => x.Itens)
            .NotEmpty().WithMessage("O pedido deve ter pelo menos um item.");

        RuleForEach(x => x.Itens).ChildRules(item =>
        {
            item.RuleFor(x => x.FkIdPrato)
                .NotEmpty().WithMessage("O id do prato é obrigatório.");

            item.RuleFor(x => x.Quantidade)
                .GreaterThan(0).WithMessage("A quantidade deve ser maior que zero.");
        });
    }
}