// класс отвечает за взаимодействие с моим АПИ
export class MainApi {
  constructor() {

  }

  // регистрация нового пользователя
  signup(email, password, name) {
    return fetch('https://api.byazrov-news.ga/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
        name: `${name}`
      })
    })
  }


  // аутентификация
  signin(email, password) {
    return fetch('https://api.byazrov-news.ga/signin', {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      })
    })
  }

  // возвращает данные о пользователе
  getUserData() {

  }

  // забирает все статьи
  getArticles() {

  }

  // создать статью
  createArticle() {

  }

  // Удалить статью
  removeArticle() {

  }

}