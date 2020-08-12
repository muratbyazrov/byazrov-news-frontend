import { logProps } from '../constans/constans';
import { header, newsApi, mainApi } from '../../index';

// установить параметры объекта из локал сторидж
function setLogProps() {
  logProps.isLoggedIn = localStorage.getItem('isloggedIn');
  logProps.userName = localStorage.getItem('userName');
}

// если пользователь не залогинен, его должно выкинуть на главную страницу
export function banish() {
  if (logProps.isLoggedIn === 'false') {
    document.location.href = 'index.html';
  }
}

// проверяем, зарегистирован ли пользователь
export function loginCheck() {
  // если запрос на получение данных пользователя...
  mainApi.getUserData()
    // правильный, то меням свойства объекта logProps на соответствующие
    .then((res) => {
      if (res.ok) {
        res.json()
          .then((data) => {
            localStorage.setItem('isloggedIn', true);
            localStorage.setItem('userName', data.data.name);
            setLogProps();
            header.render(logProps);
          });
        // если нет, так же меням свойства объекта logProps на соответствующие
      } else {
        localStorage.setItem('isloggedIn', false);
        localStorage.setItem('userName', undefined);
        setLogProps();
        header.render(logProps);
      }
    });
}

// функция выхода из аккаунта
export function signout() {
  mainApi.signout()
    // если ошибок не возникает, меням свойства объекта logProps на соответствующие
    .then(() => {
      localStorage.setItem('isloggedIn', false);
      localStorage.setItem('userName', undefined);
      setLogProps();
      if (logProps.page === 'saved') {
        document.location.href = 'index.html';
      }
      header.render(logProps);
    })
    .catch(() => {
      console.log('ошибка при выходе из аккаунта');
    });
}

// эта функция поиска новостией. Принимает ключевое слово поиска
export function searchNews(keyWord) {
  // обращаемся к API поиска новостей, передавая ключевое слово
  newsApi.getNews(keyWord);
}

// эта функция добавляет нолик в формате даты
function addZero(num) {
  if (num >= 0 && num <= 9) {
    return `0${num}`;
  }
  return num;
}

const date = new Date();
// текущая дата - 7 дней. Нужно для поиска новостей
export const actualDate = `${addZero(date.getFullYear())}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate() - 7)}`;
