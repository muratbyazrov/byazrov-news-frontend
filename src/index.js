// подключим стили
import './style.css';
// классы
import Form from './js/components/Form';
import Popup from './js/components/Popup';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import NewsApi from './js/api/NewsApi';
import Searcher from './js/components/Searcher';

const {
  logProps, emailRules, passwordRules, nameRules,
} = require('./js/constans/constans');

const { signout, loginCheck, renderTopButton } = require('./js/utils/utils');

// форма авторизации
const popupLogin = document.getElementById('popup-login');
const loginForm = document.querySelector('.login__form');
const loginEmail = document.getElementById('email-login');
const loginPassword = document.getElementById('login-password');
const loginSubmit = document.getElementById('login-button');
const loginServerError = document.getElementById('server-login-message');
const loginClose = document.getElementById('popup-login-close'); // кнопка закрытия формы авторизации

// форма регистрации
const popupSignup = document.getElementById('popup-signup'); // форма регистрации
const signupForm = document.querySelector('.signup__form');
const signupEmail = document.getElementById('email-signup');
const signupPassword = document.getElementById('signup-password');
const signupName = document.getElementById('signup-name');
const signupSubmit = document.getElementById('signup-button');
const login = document.getElementById('login'); // Кнопка войти
const signupServerError = document.getElementById('server-signup-message');
const signupClose = document.getElementById('popup-signup-close'); // кнопка закрытия формы регистрации
const signupButton = document.getElementById('signup'); // ссылка на регистрацию в форме

// форма успешной решистрации
const loginSuccessButton = document.getElementById('popup-succes-link');
const successClose = document.getElementById('popup-success-close'); // кнопка закрытия формы успешной регистрации
const popupSuccess = document.getElementById('popup-success'); // форма успешной регистрации

// ШАПКА
const userNameButton = document.getElementById('user-name-button'); // Кнопка выхода с именем польховатлея
const authorizButton = document.querySelector('.header__button'); // кнопка авторизации
const menuOpener = document.querySelector('.header__menu-opener'); // кнопка выпадающего меню
const headerMenu = document.querySelector('.header__menu');
const savedArticlesButton = document.getElementById('saved-articles'); // кнопка сохраненные статьи

// РЕЗУЛЬТАТЫ ПОИСКА
const resultBlock = document.querySelector('.result__section'); // блок результатов
const cardsContainer = document.querySelector('.result__container'); // контейнер карточек
const showMoreButton = document.querySelector('.result__button'); // кнопка показать ещё

// поиск
const searchField = document.querySelector('.search__field');
const searchSubmit = document.querySelector('.search__button');

// объект для передачи класc form
const formParams = {
  signupSubmit,
  loginSubmit,
  loginEmail,
  loginPassword,
  signupName,
  signupEmail,
  signupPassword,
  emailRules,
  passwordRules,
  nameRules,
  loginServerError,
  signupServerError,
  loginForm,
  signupForm,
};

const popupParams = {
  popupLogin, popupSignup, popupSuccess, loginServerError, signupServerError,
};

const headerParams = {
  authorizButton, headerMenu, savedArticlesButton, menuOpener,
};

const newsCardParams = {
  logProps, searchField,
};

const newsCardListParams = {
  cardsContainer, resultBlock,
};

// подключаем классы, чтобы пользоваться их методами
export const popup = new Popup(popupParams);
export const mainApi = new MainApi();
export const form = new Form(mainApi, popup, formParams, loginCheck);
export const header = new Header(headerParams, userNameButton);
export const card = new NewsCard(newsCardParams, mainApi);
export const newsList = new NewsCardList(newsCardListParams, card);
export const newsApi = new NewsApi();
const searcher = new Searcher(newsApi, newsList, searchField);

logProps.page = 'main';
loginCheck()
  .then(() => {
    header.render(logProps);
  });

// ФОРМА ЛОГИРОВАНИЯ
loginEmail.addEventListener('input', form.handlValidate.bind(form));
loginPassword.addEventListener('input', form.handlValidate.bind(form));
loginSubmit.addEventListener('click', form.validateLoginForm.bind(form));
// открыть/закрыть форму логирования
authorizButton.addEventListener('click', popup.openLogin.bind(popup));
loginClose.addEventListener('click', popup.closeLogin.bind(popup));

// ФОРМА РЕГИСТРАЦИИ
signupEmail.addEventListener('input', form.handlValidate.bind(form));
signupPassword.addEventListener('input', form.handlValidate.bind(form));
signupName.addEventListener('input', form.handlValidate.bind(form));
signupSubmit.addEventListener('click', form.validateSignupForm.bind(form));
// открыть/закрыть форму регистрации
signupButton.addEventListener('click', popup.openSignUp.bind(popup));
signupClose.addEventListener('click', popup.closeSignUp.bind(popup));
login.addEventListener('click', popup.openLogin.bind(popup));

// ФОРМА УСПЕШНОЙ РЕГИСТРАЦИИ
successClose.addEventListener('click', popup.closeSuccess.bind(popup));
loginSuccessButton.addEventListener('click', popup.openLogin.bind(popup));

// шапка
userNameButton.addEventListener('click', signout);
menuOpener.addEventListener('click', header.menuOpen.bind(header));
window.addEventListener('click', header.menuClose.bind(header)); // чтобы закрывать меню при клике на любое поле

// ПОИСК!
searchSubmit.addEventListener('click', searcher.startSearch.bind(searcher));

window.addEventListener('scroll', renderTopButton);

cardsContainer.addEventListener('click', card.savedCard.bind(card)); // сохранить статью. обработчик на контейнере
cardsContainer.addEventListener('touchstart', card.savedCard.bind(card)); // для сенсорных экранов
showMoreButton.addEventListener('click', newsList.showMore.bind(newsList)); // показать ещё
