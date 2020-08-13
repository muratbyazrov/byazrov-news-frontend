// подключим стили
import './style.css';
import { logProps } from './js/constans/constans';
import Header from './js/components/Header';
import MainApi from './js/api/MainApi';
import NewsCardList from './js/components/NewsCardList';
import NewsCard from './js/components/NewsCard';
/* import { banish } from './js/utils/utils'; */

logProps.page = 'saved';

/* banish(); */

// кнопка с пользователем
const userNameButtonSaved = document.getElementById('user-name-button-saved');
// кнопка выпадающего меню
const menuOpener = document.querySelector('.header__menu-opener');
// меню
const headerMenu = document.querySelector('.header__menu');
// контейнер сохраненных карточек
const cardContainer = document.querySelector('.result__container');
// поле с приветсвием и описанием количества статей
const pageTitle = document.querySelector('.saved__title');
const pageSubtitle = document.querySelector('.saved__properties');
const savedArticlesButton = document.getElementById('saved-articles'); // кнопка сохраненные статьи

const headerObj = {
  authorizButton: undefined,
  headerMenu,
  savedArticlesButton,
};

export const mainApi = new MainApi();
const card = new NewsCard(logProps, undefined, mainApi);
const newsList = new NewsCardList(cardContainer, card, pageTitle, pageSubtitle);
export const header = new Header(headerObj, userNameButtonSaved);

header.render(logProps, userNameButtonSaved);

// отркыть меню. bind - иначе this в функции menuOpen принимал не то значение
menuOpener.addEventListener('click', header.menuOpen.bind(header));

// отобразить карточки
mainApi.getArticles()
  .then((res) => res.json())
  .then((res) => {
    newsList.renderResults(res);
  })
  .catch((err) => {
    console.log(err);
  });

cardContainer.addEventListener('click', card.deleteCard.bind(card));
/* userNameButtonSaved.addEventListener('click', signout); */
