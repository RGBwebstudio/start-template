const form = document.querySelector('#form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const phoneValue = document.querySelector('#phone2');
const submitBtn = document.querySelector('.rgb-form__btn');
const nameLabel = document.getElementById('label-name');
const phoneLabel = document.getElementById('label-phone');
const emailLabel = document.getElementById('label-email');
const error = document.querySelector('.rgb-form__error-message');
const errorPhone = document.querySelector('.rgb-form__error-message-phone');
const errorEmail = document.querySelector('.rgb-form__error-message-email');

//Инициализация международного телефонного инпута
if (form) {
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: 'ua',
    separateDialCode: true,
    nationalMode: false,
    utilsScript:
      'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
  });
  //Функция обновления значения велью номера телефона, для вывода с кодом страны
  function updatePhoneNumber() {
    const phoneNumberWithDialCode = iti.getNumber();
    return phoneNumberWithDialCode;
  }
  //Проверка чтобы не отправлялись пустые поля
  submitBtn.addEventListener('click', (e) => {
    if (nameRegex.test(nameInput.value)) {
      isValidFormName = true;
      nameLabel.classList.remove('red-border');
      nameLabel.classList.add('green-border');
      error.classList.remove('visible');
    } else {
      isValidFormName = false;
      nameLabel.classList.remove('green-border');
      nameLabel.classList.add('red-border');
      error.classList.add('visible');
    }
    if (phoneRegex.test(phoneInput.value)) {
      isValidFormTel = true;
      phoneLabel.classList.remove('red-border');
      phoneLabel.classList.add('green-border');
      errorPhone.classList.remove('visible');
    } else {
      isValidFormTel = false;
      phoneLabel.classList.remove('green-border');
      phoneLabel.classList.add('red-border');
      errorPhone.classList.add('visible');
    }
    if (emailRegex.test(emailInput.value)) {
      isValidFormEmail = true;
      emailLabel.classList.remove('red-border');
      emailLabel.classList.add('green-border');
      errorEmail.classList.remove('visible');
    } else {
      isValidFormEmail = false;
      emailLabel.classList.remove('green-border');
      emailLabel.classList.add('red-border');
      errorEmail.classList.add('visible');
    }
  });

  //Паттерны валидации для имени, телефона и почты
  const nameRegex = /^[A-Za-zА-Яа-яЁё\- ]+$/;
  const phoneRegex =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{3,4}$/;
  // const emailRegex =
  //   /^[a-zA-Z0-9]+[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9]+[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let isValidFormName = false;
  let isValidFormTel = false;
  let isValidFormEmail = false;

  nameInput.addEventListener('input', () => {
    nameInput.value = nameInput.value.replace(/[^A-zА-яЁё]/g, '');
    if (nameRegex.test(nameInput.value)) {
      isValidFormName = true;
      nameLabel.classList.remove('red-border');
      nameLabel.classList.add('green-border');
      error.classList.remove('visible');
    } else {
      isValidFormName = false;
      nameLabel.classList.remove('green-border');
      nameLabel.classList.add('red-border');
      error.classList.add('visible');
    }
  });
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^\d]/g, '');
    if (phoneRegex.test(phoneInput.value)) {
      isValidFormTel = true;
      phoneLabel.classList.remove('red-border');
      phoneLabel.classList.add('green-border');
      errorPhone.classList.remove('visible');
    } else {
      isValidFormTel = false;
      phoneLabel.classList.remove('green-border');
      phoneLabel.classList.add('red-border');
      errorPhone.classList.add('visible');
    }
  });
  emailInput.addEventListener('input', () => {
    if (emailRegex.test(emailInput.value)) {
      isValidFormEmail = true;
      emailLabel.classList.remove('red-border');
      emailLabel.classList.add('green-border');
      errorEmail.classList.remove('visible');
    } else {
      isValidFormEmail = false;
      emailLabel.classList.remove('green-border');
      emailLabel.classList.add('red-border');
      errorEmail.classList.add('visible');
    }
  });
}


