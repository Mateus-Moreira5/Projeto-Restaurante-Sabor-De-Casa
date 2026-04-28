const details = document.querySelector('details');
const imagem = document.querySelector('.imagem-mapa');

details.addEventListener('toggle', () => {
  if (details.open) {
    // pequeno delay para a animação funcionar
    setTimeout(() => {
      imagem.style.transform = 'translateX(0)';
      imagem.style.opacity = '1';
    }, 50);
  } else {
    // volta ao estado inicial ao fechar
    imagem.style.transform = 'translateX(100%)';
    imagem.style.opacity = '0';
  }
});