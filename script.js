// Abrir menú lateral
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('sideMenu').style.left = '0';
});

// Cerrar menú lateral
document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('sideMenu').style.left = '-260px';
});
