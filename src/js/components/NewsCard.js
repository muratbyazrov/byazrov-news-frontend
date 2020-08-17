// класс карточки новости
const dateFormat = require('dateformat');

export default class NewsCard {
  constructor(logProps, searchField, mainApi) {
    this.logProps = logProps;
    this.searchField = searchField;
    this.mainApi = mainApi;
  }

  setMessage() {
    let message = '';
    if (this.logProps.isLoggedIn === 'true' && this.logProps.page === 'main') {
      message = 'Сохранить';
    } else if (this.logProps.isLoggedIn === 'false' && this.logProps.page === 'main') {
      message = 'Войдите, чтобы сохранять статьи';
    } else if (this.logProps.isLoggedIn === 'true' && this.logProps.page === 'saved') {
      message = 'Удалить';
    }
    return message;
  }

  // отрисовать фложок 'сохранить'
  renderIcon(cardIcon) {
    cardIcon.classList.toggle('saved-card');
  }

  setClassnameIcon() {
    if (this.logProps.page === 'main') {
      return 'card__button_save';
    } if (this.logProps.page === 'saved') {
      return 'card__button_delete';
    }
  }

  createCard(keyword, title, text, date, source, link, image, cardId) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = cardId;
    // createcard срабатывает дважды, a dateFormat должен только раз
    date = this.logProps.page === 'main' ? dateFormat(date, 'dd mmmm, yyyy') : date;
    const cardMessage = this.setMessage();
    const iconClassname = this.setClassnameIcon();
    const setKeyword = this.logProps.page === 'main' ? '' : `<h4 class="card__keyword"> ${keyword} </h4>`;
    card.insertAdjacentHTML('afterbegin',
      `<a class = 'card__link' href=${link} target = 'new'>
        <div class="card__head">
          <img src="${image}" class="card__image" alt="картинка к новости">
          <div class="card__button ${iconClassname}" data-title='${cardMessage}'></div>
           ${setKeyword}
        </div>

        <div class="card__details">
          <p class="card__date"> ${date} </p>
          <h3 class="card__title"> ${title} </h3>
          <p class="card__text"> ${text} </p>
          <p class="card__source"> ${source} </p>
      </div>
    </a>`);
    return card;
  }

  savedCard(event) {
    const currentCard = event.target.parentNode.parentNode; // карточка
    if (event.target.classList.contains('card__button') && !event.target.classList.contains('saved-card')) {
      event.preventDefault(); // отменяем переход по ссылке
      const keyword = this.searchField.value; // достаем ключевое слово из поля поиска
      const title = currentCard.querySelector('.card__title').textContent;
      const text = currentCard.querySelector('.card__text').textContent;
      const date = currentCard.querySelector('.card__date').textContent;
      const source = currentCard.querySelector('.card__source').textContent;
      const link = currentCard.href;
      const image = currentCard.querySelector('.card__image').src;

      this.mainApi.createArticle(keyword, title, text, date, source, link, image) // запрос на сохранение
        .then((res) => {
          if (res.ok) {
            this.renderIcon(event.target); // если ответ положительный, отрендерить иконку
            return res.json();
          }
        })
        .then(data => {
          currentCard.parentNode.id = data.data._id; // дать карточке id
        })
        .catch(err => {
          console.log(err)
        })
    } else if (event.target.classList.contains('saved-card')) { // отменить сохранение
      event.preventDefault(); // отменяем переход по ссылке
      this.mainApi.removeArticle(currentCard.parentNode.id) // запрос на удаление по id, которое определил выше
      .then (() => {
        this.renderIcon(event.target); // после чего отрендерим иконку
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  deleteCard(event) {
    const currentCard = event.target.parentNode.parentNode.parentNode;
    if (event.target.classList.contains('card__button')) {
      event.preventDefault();
      const cardId = currentCard.id;
      this.mainApi.removeArticle(cardId)
        .then((res) => {
          if (res.ok) {
            currentCard.parentNode.removeChild(currentCard);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

/* если часть интерфейса, которой управляет класс, подразумевает интерактивность,
конструктор этого класса может принимать массив обработчиков событий, которые нужно
добавить его элементам. Обработчики следует передавать конструктору в виде массива, а
за их добавление должен отвечать приватный метод _setHandlers. */
