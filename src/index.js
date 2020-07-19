// подключим стили
import './style.css';
// классы
import { Form } from './js/components/Form';
import { Header } from './js/components/Header';
import { NewsCard } from './js/components/NewsCard';
import { NewsCardList } from './js/components/NewsCardList';
import { Popup } from './js/components/Popup';

// подключаем попап, чтобы пользоваться его методами
const popup = new Popup();

const {
  autorizButton, signupButton, loginClose, signupClose, successClose,
} = require('./js/constans/constans');

autorizButton.addEventListener('click', popup.openLogin);
signupButton.addEventListener('click', popup.openSignUp);

loginClose.addEventListener('click', popup.closeLogin);
signupClose.addEventListener('click', popup.closeSignUp);
successClose.addEventListener('click', popup.closeSuccess);
