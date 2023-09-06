document.querySelector('#open-burger-btn').addEventListener('click', () => {
  const burgerMenu = document.querySelector('#burger-menu');
  burgerMenu.classList.remove('hide');
});
document.querySelector('#burger-menu-close').addEventListener('click', () => {
  const burgerMenu = document.querySelector('#burger-menu');
  burgerMenu.classList.add('hide');
});

