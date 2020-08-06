// подключим стили
import './style.css';
import { logProps } from './js/constans/constans';
import { Header } from './js/components/Header';

const header = new Header();

console.log(logProps);

header.render(logProps);
