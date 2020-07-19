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

module.exports = {
  autorizButton,
  popupLogin,
  popupSignup,
  signupButton,
  loginClose,
  signupClose,
  successClose,
  popupSuccess,
};
