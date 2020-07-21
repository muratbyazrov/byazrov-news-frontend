// кнопка авторизации
const autorizButton = document.querySelector('.header__button_user');
// форма логина
const popupLogin = document.getElementById('popup-login');
// форма регистрации
const popupSignup = document.getElementById('popup-signup');
// форма успешной регистрации
const popupSuccess = document.getElementById('popup-success');
// кнопка закрытия формы авторизации
const loginClose = document.getElementById('popup-login-close');
// кнопка закрытия формы регистрации
const signupClose = document.getElementById('popup-signup-close');
// кнопка закрытия формы успешной регистрации
const successClose = document.getElementById('popup-success-close');
// ссылка на регистрацию в форме
const signupButton = document.getElementById('signup');

// форма авторизации
const loginForm = document.querySelector('.login__form');
const loginEmail = document.getElementById('email-login');
const loginPassword = document.getElementById('login-password');
const loginSubmit = document.getElementById('login-button');

// форма регистрации
const signupForm = document.querySelector('.signup__form');
const signupEmail = document.getElementById('email-signup');
const signupPassword = document.getElementById('signup-password');
const signupName = document.getElementById('signup-name');
const signupSubmit = document.getElementById('signup-button');
const login = document.getElementById('login')

// правила для валидации полей форм
const emailRules = {
  required: {
    required: true,
    message: 'Это обязательное поле',
  },
  email: {
    email: true,
    message: 'Неправильный формат email',
  },
};
const passwordRules = {
  required: {
    required: true,
    message: 'Это обязательное поле',
  },
  alphaNumeric: {
    alphaNumeric: true,
    message: 'Пароль может содеражить только буквы и цифры',
  },
  min: {
    min: 8,
    message: 'Пароль должен содержать не менее 8 символов',
  },
};
const nameRules = {
  required: {
    required: true,
    message: 'Это обязательное поле',
  },
  min: {
    min: 2,
    message: 'Имя должно содержать не менее 2 символов',
  },
};

module.exports = {
  autorizButton,
  popupLogin,
  popupSignup,
  signupButton,
  loginClose,
  signupClose,
  successClose,
  popupSuccess,
  loginForm,
  loginEmail,
  loginPassword,
  loginSubmit,
  signupEmail,
  signupPassword,
  signupName,
  signupSubmit,
  signupForm,
  emailRules,
  passwordRules,
  nameRules,
  login,
};
