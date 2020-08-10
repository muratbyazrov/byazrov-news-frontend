// класс отвечает за взаимодействие с моим АПИ
export class MainApi {
  constructor(cardListClass) {
    this.cardListClass = cardListClass;
  }

  // регистрация нового пользователя
  signup(email, password, name) {
    return fetch('http://localhost:3000/signup', {
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
    return fetch('http://localhost:3000/signin', {
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
  // создать статью
  createArticle(keyword, title, text, date, source, link, image) {
    return fetch('http://localhost:3000/articles', {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keyword: `${keyword}`,
        title: `${title}`,
        text: `${text}`,
        date: `${date}`,
        source: `${source}`,
        link: `${link}`,
        image: `${image}`,
      })
    })
  }

  // возвращает данные о пользователе
  getUserData() {

  }

  // забирает все статьи
  getArticles() {
    return fetch('http://localhost:3000/articles', {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        this.cardListClass.renderResults(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Удалить статью
  removeArticle() {
    return fetch(`http://localhost:3000/articles/${articleID}`, {
      method: 'DELETE',
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

}