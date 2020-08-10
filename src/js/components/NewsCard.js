// класс карточки новости
export default class NewsCard {
  constructor(logProps, searchField, mainApi) {
    this.logProps = logProps;
    this.searchField = searchField;
    this.mainApi = mainApi;
  }
  setMessage() {
    let message = '';
    if (this.logProps.isLoggedIn === 'true' && this.logProps.page === 'main') {
      message = 'Сохранить'
    } else if (this.logProps.isLoggedIn === 'false' && this.logProps.page === 'main') {
      message = 'Войдите, чтобы сохранять статьи'
    } else if (this.logProps.isLoggedIn === 'true' && this.logProps.page === 'saved') {
      message = 'Удалить'
    }
    return message;
  }
  renderIcon() {
    if (this.logProps.isLoggedIn === 'true' && event.target.classList.contains('card__button')) {
      event.target.classList.toggle('saved-card')
    }
  }
  setClassnameIcon() {
    if (this.logProps.page === 'main') {
      return 'card__button_save'
    } else if (this.logProps.page === 'saved') {
      return 'card__button_delete'
    }
  }

  createCard(keyword, title, text, date, source, link, image) {
    const card = document.createElement('div');
    const cardMessage = this.setMessage();
    const iconClassname = this.setClassnameIcon();
    card.classList.add('card')
    card.insertAdjacentHTML('afterbegin',
      `<a href=${link} target = 'new'>
        <div class="card__head">
          <img src="${image}" class="card__image" alt="картинка к новости">
          <div class="card__button ${iconClassname}" data-title='${cardMessage}'></div>
          <h4 class="card__keyword"> ${keyword} </h4>
        </div>

        <div class="card__details">
          <p class="card__date"> ${date} </p>
          <h3 class="card__title"> ${title} </h3>
          <p class="card__text"> ${text} </p>
          <p class="card__source"> ${source} </p>
      </div>
    </a>`);
    return card
  }

  savedCard() {
    if (event.target.classList.contains('card__button')) {
      event.preventDefault();
      const currentCard = event.target.parentNode.parentNode;
      const keyword = this.searchField.value
      const title = currentCard.querySelector('.card__title').textContent;
      const text = currentCard.querySelector('.card__text').textContent;
      const date = currentCard.querySelector('.card__date').textContent;
      const source = currentCard.querySelector('.card__source').textContent;
      const link = currentCard.href
      const image = currentCard.querySelector('.card__image').src;

      this.mainApi.createArticle(keyword, title, text, date, source, link, image)
        .then(res => { console.log(res.json()) })
    }

  }

  deleteCard() {
    if (event.target.classList.contains('card__button')) {
      event.preventDefault();
      const cardId = '5f313e8cbcedb559d02a5267'
      console.log(this)
      this.mainApi.removeArticle(cardId)
        .then((res) => {
          console.log(res)
        })
    }
  }
}

/* если часть интерфейса, которой управляет класс, подразумевает интерактивность,
конструктор этого класса может принимать массив обработчиков событий, которые нужно добавить его элементам.
 Обработчики следует передавать конструктору в виде массива, а за их добавление должен
  отвечать приватный метод _setHandlers. */