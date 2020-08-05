import { logProps } from '../constans/constans';
import { header, newsApi } from '../../index';

// проверяем, зарегистирован ли пользователь
export function loginCheck() {
  return fetch('http://localhost:3000/users/me', {
    method: 'GET',
    credentials: 'include',
    withCredentials: true,
    headers: {
      authorization: document.cookie,
      'Content-Type': 'application/json',
    },
  })
  // если да, то меням свойства объекта logProps на соответствующие
    .then((res) => {
      if (res.ok) {
        res.json()
          .then((data) => {
            logProps.isLoggedIn = true;
            logProps.userName = data.data.name;
            header.render(logProps);
          });
        // если нет, так же меням свойства объекта logProps на соответствующие
      } else {
        logProps.isLoggedIn = false;
        logProps.userName = undefined;
        header.render(logProps);
      }
    });
}

// функция выхода из аккаунта
export function signout() {
  // отправляем запрос на обнуление куки
  return fetch('http://localhost:3000//signout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  // если ошибок не возникает, меням свойства объекта logProps на соответствующие
    .then(() => {
      logProps.isLoggedIn = false;
      logProps.userName = undefined;
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
