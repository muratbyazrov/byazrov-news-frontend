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

  // класс кнопочке карточки корзина или флажок
  setClassnameIcon() {
    if (this.logProps.page === 'saved') {
      return 'card__button_delete';
    }
    return 'card__button_save';
  }

  createCard(keyword, title, text, date, source, link, image, cardId) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = cardId;
    let dateNews = date; // изменение параметров функции может привести к ошибкам, поэтомы вынесли
    // createcard срабатывает дважды, a dateFormat должен только раз
    dateNews = this.logProps.page === 'main' ? dateFormat(dateNews, 'dd mmmm, yyyy') : dateNews;
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
          <p class="card__date"> ${dateNews} </p>
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

      this.mainApi.createArticle(keyword, title, text, date, source, link, image) // запрос на сохр.
        .then((res) => {
          if (res.ok) {
            this.renderIcon(event.target); // только если ответ положительный, отрендерить иконку
          } return res.json(); // но в любом случае отдаем ответ
        })
        .then((data) => {
          currentCard.parentNode.id = data.data._id; // дать карточке id
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (event.target.classList.contains('saved-card')) { // отменить сохранение
      event.preventDefault(); // отменяем переход по ссылке
      this.mainApi.removeArticle(currentCard.parentNode.id) // запрос на удаление по id
        .then(() => {
          this.renderIcon(event.target); // после чего отрендерим иконку
        })
        .catch((err) => {
          console.log(err);
        });
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
