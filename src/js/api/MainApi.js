const { serverUrl } = require('../constans/constans'); // временно здесь. возможно в некоторых методаъх работает this.url - поставить везде и проверить

// класс отвечает за взаимодействие с моим АПИ
export default class MainApi {
  constructor() {
  }

  // регистрация нового пользователя
  signup(email, password, name) {
    return fetch(`${serverUrl}/signup`, {
      method: 'POST',
      credentials: 'include', // разрешаем отправку куки
      withCredentials: true, // разрешаем кросс-доменные запросы с использованием куки
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
        name: `${name}`,
      }),
    });
  }

  // аутентификация
  signin(email, password) {
    return fetch(`${serverUrl}/signin`, {
      method: 'POST',
      credentials: 'include', // разрешаем отправку куки
      withCredentials: true, // разрешаем кросс-доменные запросы с использованием куки
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    });
  }

  // выйти из аккаунта
  signout() {
    // отправляем запрос на обнуление куки
    return fetch(`${serverUrl}/signout`, {
      method: 'POST',
      credentials: 'include', // разрешаем отправку куки
      withCredentials: true, // разрешаем кросс-доменные запросы с использованием куки
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // создать статью
   createArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${serverUrl}/articles`, {
      method: 'POST',
      credentials: 'include', // разрешаем отправку куки
      withCredentials: true, // разрешаем кросс-доменные запросы с использованием куки
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: `${keyword}`,
        title: `${title}`,
        text: `${text}`,
        date: `${date}`,
        source: `${source}`,
        link: `${link}`,
        image: `${image}`,
      }),
    });
  }

  // возвращает данные о пользователе
  getUserData() {
    console.log(serverUrl)
    return fetch(`http://localhost:3000/users/me`, {
      method: 'GET',
      credentials: 'include', // разрешаем отправку куки
      withCredentials: true, // разрешаем кросс-доменные запросы с использованием куки
      headers: {
        authorization: document.cookie,
        'Content-Type': 'application/json',
      },
    });
  }

  // забирает все статьи
  getArticles() {
    return fetch(`${serverUrl}/articles`, {
      method: 'GET',
      credentials: 'include', // разрешаем отправку куки
      withCredentials: true, // разрешаем кросс-доменные запросы с использованием куки
    });
  }

  // Удалить статью
  removeArticle(articleId) {
    return fetch(`${serverUrl}/articles/${articleId}`, {
      method: 'DELETE',
      credentials: 'include', // разрешаем отправку куки
      withCredentials: true, // разрешаем кросс-доменные запросы с использованием куки
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
