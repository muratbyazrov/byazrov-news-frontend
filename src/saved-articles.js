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
const saveCardContainer = document.querySelector('.result__container');

const card = new NewsCard(logProps);
const newsList = new NewsCardList(saveCardContainer, card);
const mainApi = new MainApi(newsList);
const header = new Header(userNameButtonSaved, undefined, headerMenu);

header.render(logProps, userNameButtonSaved);

// bind - иначе this в функции menuOpen принимал не то значение
menuOpener.addEventListener('click', header.menuOpen.bind(header));

mainApi.getArticles();
