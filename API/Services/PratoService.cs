using System.Xml;
using API.DTOs.PratoDTOs;
using API.Models;
using API.Repository.Interfaces;
using API.Services.Interfaces;
using Microsoft.JSInterop.Infrastructure;

namespace API.Services;

public class PratoService(IPratoRepository pratoRepository) : IPratoService
{
    public async Task<List<PratoResponseDTO>> ListAllAsync()
    {
        var pratos = await pratoRepository.ListAllAsync();
        return pratos.Select(p => new PratoResponseDTO(
            p.IdPrato,
            p.NomePrato,
            p.Descricao,
            p.InfoIngredientes,
            p.Acompanhamentos,
            p.Preco,
            p.Disponivel
        )).ToList();
    }
    
    public async Task<PratoResponseDTO?> GetByIdAsync(Guid id)
    {
        var prato = await pratoRepository.GetByIdAsync(id);
        if (prato is null) return null;
        return new PratoResponseDTO(prato.IdPrato,
            prato.NomePrato,
            prato.Descricao,
            prato.InfoIngredientes,
            prato.Acompanhamentos,
            prato.Preco,
            prato.Disponivel);
    }

    public async Task<PratoResponseDTO> CreateAsync(CriarPratoDTO dto)
    {
        var prato = new Prato( 
            dto.NomePrato,
            dto.Descricao,
            dto.InfoIngrediente,
            dto.Acompanhamento,
            dto.Preco
            );
        var criado = await pratoRepository.CreateAsync(prato);
        return new PratoResponseDTO(
            criado.IdPrato,
            criado.NomePrato,
            criado.Descricao,
            criado.InfoIngredientes,
            criado.Acompanhamentos,
            criado.Preco,
            criado.Disponivel);
    }

    public async Task<PratoResponseDTO?> UpdateAsync(Guid id, AtualizarPratoDTO dto)
    {
        var prato = await pratoRepository.GetByIdAsync(id);
        if (prato == null) return null;

        if (dto.NomePrato != null) prato.NomePrato = dto.NomePrato;
        if (dto.Descricao != null) prato.Descricao = dto.Descricao;
        if (dto.InfoIngrediente != null) prato.InfoIngredientes = dto.InfoIngrediente;
        if (dto.Acompanhamento != null) prato.Acompanhamentos = dto.Acompanhamento;
        if (dto.Preco != null) prato.Preco = dto.Preco.Value;
        if (dto.Disponivel != null) prato.Disponivel = dto.Disponivel.Value;

        var atualizando = await pratoRepository.UpdateAsync(prato);
        if (atualizando == null) return null;

        return new PratoResponseDTO(
            atualizando.IdPrato,
            atualizando.NomePrato,
            atualizando.Descricao,
            atualizando.InfoIngredientes,
            atualizando.Acompanhamentos,
            atualizando.Preco,
            atualizando.Disponivel
            );
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await pratoRepository.DeleteAsync(id);
    }
}