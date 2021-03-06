// подключим стили
import './style.css';
import Header from './js/components/Header';
import MainApi from './js/api/MainApi';
import NewsCardList from './js/components/NewsCardList';
import NewsCard from './js/components/NewsCard';

const { signout } = require('./js/utils/utils');
const { logProps } = require('./js/constans/constans');

logProps.page = 'saved';
// выкидываем незалогиненного пользователя на главную
(function banish() {
  if (logProps.isLoggedIn === 'false') {
    document.location.href = 'index.html';
  }
}());

const userNameButtonSaved = document.getElementById('user-name-button-saved'); // кнопка с пользователем
const menuOpener = document.querySelector('.header__menu-opener'); // кнопка выпадающего меню
const headerMenu = document.querySelector('.header__menu'); // меню
const cardsContainer = document.querySelector('.result__container'); // контейнер сохраненных карточек
const pageTitle = document.querySelector('.saved__title'); // поле с приветсвием и описанием количества статей
const pageSubtitle = document.querySelector('.saved__properties');
const savedArticlesButton = document.getElementById('saved-articles'); // кнопка сохраненные статьи

// параметры, передаваемые экземпляру header
const headerParams = {
  authorizButton: undefined,
  headerMenu,
  savedArticlesButton,
  menuOpener,
};

const newsCardParams = {
  logProps,
};

const newsCardListParams = {
  cardsContainer, pageTitle, pageSubtitle,
};

const mainApi = new MainApi();
const card = new NewsCard(newsCardParams, mainApi);
const newsList = new NewsCardList(newsCardListParams, card);
const header = new Header(headerParams, userNameButtonSaved);

header.render(logProps, userNameButtonSaved); // ренедерим правильно header
menuOpener.addEventListener('click', header.menuOpen.bind(header)); // открыть меню

// отобразить карточки
mainApi.getArticles()
  .then((res) => res.json())
  .then((res) => {
    newsList.renderSavedArticles(res);
  })
  .catch((err) => {
    console.log(err);
  });

cardsContainer.addEventListener('click', card.deleteCard.bind(card));
userNameButtonSaved.addEventListener('click', signout);
window.addEventListener('click', header.menuClose.bind(header)); // чтобы закрывать меню при клике на любое поле
