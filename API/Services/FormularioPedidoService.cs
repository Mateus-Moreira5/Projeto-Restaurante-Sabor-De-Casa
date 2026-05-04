using API.DTOs.FormularioPedidoDTO;
using API.Models;
using API.Repository.Interfaces;

namespace API.Services.Interfaces;

public class FormularioPedidoService(IFormularioPedidoRepository formularioPedidoRepository) : IFormularioPedidoService
{
    public async Task<List<FormularioPedidoResponseDto>> ListAllAsync()
    {
        var formulario = await formularioPedidoRepository.ListAllAsync();
        return formulario.Select(f => new FormularioPedidoResponseDto(
            f.CodigoPedido,
            f.Nome,
            f.Telefone,
            f.TipoPagamento,
            f.TipoEntrega,
            f.Cep,
            f.Logradouro,
            f.Numero,
            f.Bairro,
            f.Complemento
            )).ToList();
    }

    public async Task<FormularioPedidoResponseDto?> GetById(Guid id)
    {
        var formulario = await formularioPedidoRepository.GetByIdAsync(id);
        if (formulario == null) return null;
        return new FormularioPedidoResponseDto(
            formulario.CodigoPedido,
            formulario.Nome,
            formulario.Telefone,
            formulario.TipoPagamento,
            formulario.TipoEntrega,
            formulario.Cep,
            formulario.Logradouro,
            formulario.Numero,
            formulario.Bairro,
            formulario.Complemento
            );
    }

    public async Task<FormularioPedidoResponseDto> CreateAsync(FormularioPedidoCreateDto dto)
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
        var criado = await formularioPedidoRepository.CreateAsync(formulario);
        return new FormularioPedidoResponseDto(
            criado.CodigoPedido,
            criado.Nome,
            criado.Telefone,
            criado.TipoPagamento,
            criado.TipoEntrega,
            criado.Cep,
            criado.Logradouro,
            criado.Numero,
            criado.Bairro,
            criado.Complemento
            );
    }

    public async Task<FormularioPedidoResponseDto> UpdateAsync(Guid id, FormularioPedidoCreateDto dto)
    {
        var formularioUpdate = await formularioPedidoRepository.GetByIdAsync(id);
        if (formularioUpdate == null) return null;

        formularioUpdate.Numero = dto.Numero;
        formularioUpdate.Telefone = dto.Telefone;
        formularioUpdate.TipoPagamento = dto.TipoPagamento;
        formularioUpdate.TipoEntrega = dto.TipoEntrega;
        formularioUpdate.Cep = dto.Cep;
        formularioUpdate.Logradouro = dto.Logradouro;
        formularioUpdate.Numero = dto.Numero;
        formularioUpdate.Bairro = dto.Bairro;
        formularioUpdate.Complemento = dto.Complemento;

        var atualizado = await formularioPedidoRepository.UpdateAsync(formularioUpdate);
        if (atualizado == null) return null;

        return new FormularioPedidoResponseDto(
            atualizado.CodigoPedido,
            atualizado.Nome,
            atualizado.Telefone,
            atualizado.TipoPagamento,
            atualizado.TipoEntrega,
            atualizado.Cep,
            atualizado.Logradouro,
            atualizado.Numero,
            atualizado.Bairro,
            atualizado.Complemento
            );
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await formularioPedidoRepository.DeleteAsync(id);
    }
}