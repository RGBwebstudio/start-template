const modal = document.querySelector('#myModal');

document.querySelectorAll('[data-modals-open]').forEach((e) =>
  e.addEventListener('click', (e) => {
    e.preventDefault();

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  })
);
document.querySelectorAll('[data-modals-close]').forEach((e) =>
  e.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  })
);
document.querySelector('.myModal').addEventListener('click', (e) => {
  // e.preventDefault();
  if (!e.target.closest('.myModal__content')) {
    modal.classList.remove('active');
  }
});

