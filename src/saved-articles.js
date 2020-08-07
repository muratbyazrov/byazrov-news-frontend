// подключим стили
import './style.css';

import { logProps } from './js/constans/constans';
import { Header } from './js/components/Header';

const userNameButtonSaved = document.getElementById('user-name-button-saved');

const header = new Header(userNameButtonSaved);

header.render(logProps, userNameButtonSaved);
