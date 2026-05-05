using API.DTOs.Pedido;
using API.Models;
using API.Repository.Interfaces;
using API.Services.Interfaces;

namespace API.Services;

public class PedidoService(
    IPedidoRepository pedidoRepository,
    IFormularioPedidoRepository formularioPedidoRepository) : IPedidoService
{
    public async Task<List<PedidoResponseDto>> ListAllAsync()
    {
        var pedidos = await pedidoRepository.ListAllAsync();
        return pedidos.Select(p => new PedidoResponseDto(
            p.IdPedido,
            p.Prato!.NomePrato,
            p.Prato!.Preco,
            p.FormularioPedido!.Nome,
            p.FormularioPedido!.Telefone,
            p.FormularioPedido!.TipoEntrega,
            p.FormularioPedido!.TipoPagamento,
            p.Quantidade,
            p.Personalizacao,
            p.Concluido,
            p.FormularioPedido!.Cep,
            p.FormularioPedido!.Logradouro,
            p.FormularioPedido!.Numero,
            p.FormularioPedido!.Bairro,
            p.FormularioPedido!.Complemento
        )).ToList();
    }

    public async Task<PedidoResponseDto?> GetByIdAsync(Guid id)
    {
        var pedido = await pedidoRepository.GetByIdAsync(id);
        if (pedido is null) return null;
        return new PedidoResponseDto(
            pedido.IdPedido,
            pedido.Prato!.NomePrato,
            pedido.Prato!.Preco,
            pedido.FormularioPedido!.Nome,
            pedido.FormularioPedido!.Telefone,
            pedido.FormularioPedido!.TipoEntrega,
            pedido.FormularioPedido!.TipoPagamento,
            pedido.Quantidade,
            pedido.Personalizacao,
            pedido.Concluido,
            pedido.FormularioPedido!.Cep,
            pedido.FormularioPedido!.Logradouro,
            pedido.FormularioPedido!.Numero,
            pedido.FormularioPedido!.Bairro,
            pedido.FormularioPedido!.Complemento
        );
    }

    public async Task<List<PedidoResponseDto>> CreateAsync(PedidoCompletoCreateDto dto)
    {
        var formulario = new FormularioPedido(
            dto.Nome,
            dto.Telefone,
            dto.TipoPagamento,
            dto.TipoEntrega,
            dto.Cep,
            dto.Logradouro,
            dto.Numero,
            dto.Bairro,
            dto.Complemento
        );
        await formularioPedidoRepository.CreateAsync(formulario);

        var resultado = new List<PedidoResponseDto>();

        foreach (var item in dto.Itens)
        {
            var pedido = new Pedido(
                formulario.CodigoPedido,
                item.FkIdPrato,
                item.Quantidade,
                item.Personalizacao
            );
            await pedidoRepository.CreateAsync(pedido);
            var completo = await pedidoRepository.GetByIdAsync(pedido.IdPedido);
            resultado.Add(new PedidoResponseDto(
                completo!.IdPedido,
                completo.Prato!.NomePrato,
                completo.Prato!.Preco,
                completo.FormularioPedido!.Nome,
                completo.FormularioPedido!.Telefone,
                completo.FormularioPedido!.TipoEntrega,
                completo.FormularioPedido!.TipoPagamento,
                completo.Quantidade,
                completo.Personalizacao,
                completo.Concluido,
                completo.FormularioPedido!.Cep,
                completo.FormularioPedido!.Logradouro,
                completo.FormularioPedido!.Numero,
                completo.FormularioPedido!.Bairro,
                completo.FormularioPedido!.Complemento
            ));
        }

        return resultado;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await pedidoRepository.Delete(id);
    }
}