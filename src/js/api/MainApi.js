// класс отвечает за взаимодействие с моим АПИ
export default class MainApi {
  constructor() {
  }

  // регистрация нового пользователя
  signup(email, password, name) {
    return fetch('https://api.byazrov-news.ga/signup', {
      method: 'POST',
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
    return fetch('https://api.byazrov-news.ga/signin', {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
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
    return fetch('https://api.byazrov-news.ga/signout', {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // создать статью
   createArticle(keyword, title, text, date, source, link, image) {
    return fetch('https://api.byazrov-news.ga/articles', {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
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
    return fetch('https://api.byazrov-news.ga/users/me', {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
      headers: {
        authorization: document.cookie,
        'Content-Type': 'application/json',
      },
    });
  }

  // забирает все статьи
  getArticles() {
    return fetch('https://api.byazrov-news.ga/articles', {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
    });
  }

  // Удалить статью
  removeArticle(articleId) {
    return fetch(`https://api.byazrov-news.ga/articles/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
