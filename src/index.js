// подключим стили
import './style.css';
// классы
import { Form } from './js/components/Form';
import { Popup } from './js/components/Popup';
import { Header } from './js/components/Header';
import { NewsCard } from './js/components/NewsCard';
import { NewsCardList } from './js/components/NewsCardList';

const {
  autorizButton, signupButton, loginClose, signupClose, loginEmail, loginPassword,
  loginSubmit, signupEmail, signupPassword, signupName, signupSubmit, login
} = require('./js/constans/constans');

// подключаем классы, чтобы пользоваться их методами
const popup = new Popup();
const form = new Form();

// ФОРМА ЛОГИРОВАНИЯ
loginEmail.addEventListener('input', form.handlValidate);
loginPassword.addEventListener('input', form.handlValidate);
loginSubmit.addEventListener('click', form.validateLoginForm);
// открыть/закрыть форму логирования
autorizButton.addEventListener('click', popup.openLogin);
loginClose.addEventListener('click', popup.closeLogin);

// ФОРМА РЕГИСТРАЦИИ
signupEmail.addEventListener('input', form.handlValidate);
signupPassword.addEventListener('input', form.handlValidate);
signupName.addEventListener('input', form.handlValidate);
signupSubmit.addEventListener('click', form.validateSignupForm);
// открыть/закрыть форму регистрации
signupButton.addEventListener('click', popup.openSignUp);
signupClose.addEventListener('click', popup.closeSignUp);
login.addEventListener('click', popup.openLogin);

// ФОРМА УСПЕШНОЙ РЕГИСТРАЦИИ
// successClose.addEventListener('click', popup.closeSuccess);

export {
  form,
};
