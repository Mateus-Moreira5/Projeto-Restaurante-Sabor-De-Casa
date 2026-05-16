using API.DTOs.ViaCep;

namespace API.Services;

public class ViaCepService (HttpClient httpClient)
{
    public async Task<ViaCepResponseDto?> BuscarEnderecoAsync(string cep)
    {
        var cepLimpo = cep.Replace("-", "").Trim();
        var response = await httpClient.GetAsync($"https://viacep.com.br/ws/{cepLimpo}/json/");
        if (!response.IsSuccessStatusCode) return null;
        var content = await response.Content.ReadFromJsonAsync<ViaCepResponseDto>();
        if (content is null || content.Erro == true) return null;
        return content;
    }
}