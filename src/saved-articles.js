// подключим стили
import './style.css';

import { logProps } from './js/constans/constans';
import { Header } from './js/components/Header';
import { MainApi } from './js/api/MainApi';
import NewsCardList from './js/components/NewsCardList';
import NewsCard from './js/components/NewsCard';

logProps.page = 'saved';

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
pageTitle.textContent = `${logProps.userName}, у вас 5 сохранённых статей`;

const mainApi = new MainApi();
const card = new NewsCard(logProps, undefined, mainApi);
const newsList = new NewsCardList(cardContainer, card);
const header = new Header(userNameButtonSaved, undefined, headerMenu);

header.render(logProps, userNameButtonSaved);

// bind - иначе this в функции menuOpen принимал не то значение
menuOpener.addEventListener('click', header.menuOpen.bind(header));

mainApi.getArticles()
  .then((res) => res.json())
  .then((res) => {
    newsList.renderResults(res);
  })
  .catch((err) => {
    console.log(err);
  });

cardContainer.addEventListener('click', card.deleteCard.bind(card));

const articleCount = setTimeout(() => console.log(cardContainer.childNodes.length), 400);