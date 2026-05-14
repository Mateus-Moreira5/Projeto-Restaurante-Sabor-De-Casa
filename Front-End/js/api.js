const BASE_URL = 'https://projeto-restaurante-sabor-de-casa-production.up.railway.app';

function getToken() {
  return sessionStorage.getItem('token');
}

function headers(authenticated = false) {
  const h = { 'Content-Type': 'application/json' };
  if (authenticated) {
    const token = getToken();
    if (token) h['Authorization'] = `Bearer ${token}`;
  }
  return h;
}

async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Erro ${response.status}`);
  }
  if (response.status === 204) return null;
  return await response.json();
}