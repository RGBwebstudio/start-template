const options = document.querySelectorAll('.option');

options.forEach((option) => {
  option.addEventListener('click', () => {
    options.forEach((opt) => opt.classList.remove('active'));
    option.classList.add('active');
  });
});
