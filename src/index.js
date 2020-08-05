// подключим стили
import './style.css';
// классы
import Form from './js/components/Form';
import Popup from './js/components/Popup';
import { MainApi } from './js/api/MainApi';
import { Header } from './js/components/Header';
import { NewsCard } from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import { signout, searchNews, loginCheck } from './js/utils/utils';
import { NewsApi } from './js/api/NewsApi';

const {
  autorizButton, signupButton, loginClose, signupClose, loginEmail, loginPassword, successClose,
  loginSubmit, signupEmail, signupPassword, signupName, signupSubmit, login, loginSuccessButton,
  logProps, userNameButton,
} = require('./js/constans/constans');

const cardsContainer = document.querySelector('.result__container');

// подключаем классы, чтобы пользоваться их методами
export const popup = new Popup();
export const mainApi = new MainApi();
export const form = new Form(mainApi);
export const header = new Header(logProps);
export const card = new NewsCard();
export const newsList = new NewsCardList(cardsContainer, card);
export const newsApi = new NewsApi(newsList);

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
successClose.addEventListener('click', popup.closeSuccess);
loginSuccessButton.addEventListener('click', popup.openLogin);

// шапка
userNameButton.addEventListener('click', signout);

// поиск
const searchField = document.querySelector('.search__field');
const searchSubmit = document.querySelector('.search__button');
searchSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  searchNews(searchField.value);
});
