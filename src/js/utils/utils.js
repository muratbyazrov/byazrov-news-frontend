/*
* Нужна функция, котороая будет проверять зарегистрирован ли пользователь или нет.
Для этого она должна отправлять запрос на users/me - если ответ положительный, значит
пользователь зарегистриован.
* Эта функция должна поменять параметры объекта props - имя и статус регистрации.
* далее шапка сайта берет данные из этого объекта и рендерится соответсвующе
*/

import { logProps } from '../constans/constans';
import { header } from '../../index';

export function loginCheck() {
  return fetch('https://api.byazrov-news.ga/users/me', {
    method: 'GET',
    credentials: 'include',
    withCredentials: true,
    headers: {
      authorization: document.cookie,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        res.json()
          .then((data) => {
            logProps.isLoggedIn = true;
            logProps.userName = data.data.name;
            header.render(logProps);
          });
      } else {
        logProps.isLoggedIn = false;
        logProps.userName = undefined;
        header.render(logProps);
      }
    });
}

export function signout() {
  return fetch('https://api.byazrov-news.ga/signout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      logProps.isLoggedIn = false;
      logProps.userName = undefined;
      header.render(logProps);
    });
}
