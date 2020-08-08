// подключим стили
import './style.css';

import { logProps } from './js/constans/constans';
import { Header } from './js/components/Header';

const userNameButtonSaved = document.getElementById('user-name-button-saved');
// кнопка выпадающего меню
const menuOpener = document.querySelector('.header__menu-opener');
const headerMenu = document.querySelector('.header__menu');

const header = new Header(userNameButtonSaved, undefined, headerMenu);

header.render(logProps, userNameButtonSaved);

// bind - иначе this в функции menuOpen принимал не то значение
menuOpener.addEventListener('click', header.menuOpen.bind(header));
