/* eslint-disable max-len */
import { logProps } from '../constans/constans';

export default class NewsCardList {
  constructor(container, cardClass, resultBlock, pageTitle, pageSubtitle) {
    this.resultBlock = resultBlock; // секция с результатом
    this.container = container; // блок с карточками
    this.cardClass = cardClass; // экзмпляр класса карточки
    this.pageTitle = pageTitle; // для page = saved
    this.pageSubtitle = pageSubtitle; // для page = saved
    this.keywordArr = []; // массив ключевых слов
    this.accumCards = []; // аккумулирующий массив карточек
  }

  // рендер карточек main
  renderResults(obj) {
    this.clearCardContainer(); // очистка контейнера от предыдущих результатов
    if (obj.articles.length === 0) { // если нет карточек для отрисовки
      this.hideResultBlock(); // скрыть блок результатов
      this.renderError(); // и отобразить блок 'ничего не найдено'
    } else {
      this.clearResultBlock(); // очищаем секцию от not-found
      this.showResultBlock(); // нужно показать блок с карточками
      obj.articles.forEach((item) => {
        const { keyword, title } = item;
        const image = item.urlToImage;
        const date = item.publishedAt;
        const text = item.description;
        const source = item.source.name;
        const link = item.url;
        const cardId = item._id;
        const newCard = this.cardClass.createCard(keyword, title, text, date, source, link, image, cardId); // создать карточку
        this.addCard(this.container, newCard); // добавить карточки
      });
    }
  }

  // рендер карточек saved
  renderSavedArticles(obj) {
    let articleCount = 0;
    obj.articles.forEach((item) => {
      const {
        keyword, image, date, title, text, source, link, owner,
      } = item;
      const cardId = item._id;
      if (logProps.userId === owner) { // отображаем только свои карточки
        const newCard = this.cardClass.createCard(keyword, title, text, date, source, link, image, cardId); // создать карточку
        this.addCard(this.container, newCard);
        this.renderSubtitle(keyword);
        articleCount += 1;
      }
    });
    this.renderArticlesInfo(articleCount); // сколько всего карточек
  }

  // добавляет блок "ничего не найдено"
  renderError() {
    this.clearResultBlock(); // очистка всей секции результатов
    const notFoundBlock = document.createElement('div');
    notFoundBlock.classList.add('not-found');
    notFoundBlock.insertAdjacentHTML('afterbegin',
      `<div class="not-found__icon"></div>
    <h3 class="not-found__title">Ничего не найдено</h3>
    <p class="not-found__subtitle">К сожалению по вашему запросу ничего не найдено.</p>`);
    this.resultBlock.appendChild(notFoundBlock);
  }

  // отобразить лоадер
  renderLoader() {
    this.clearResultBlock(); // очистка всей секции результатов
    this.clearLoader(); // чтобы лоадеры не размножались
    const loader = document.createElement('div');
    loader.classList.add('loader-block');
    loader.insertAdjacentHTML('afterbegin',
      `<i class="loader-block__circle-preloader"></i>
    <h3 class="loader-block__title">Идет поиск новостей...</h3>`);
    this.resultBlock.insertBefore(loader, this.resultBlock.firstChild); // так лоудер будет перед карточками
  }

  // открывает блок с результатами
  showResultBlock() {
    this.container.parentNode.classList.add('display');
  }

  hideResultBlock() {
    this.container.parentNode.classList.remove('display');
  }

  // удалить блок ничего не найдено
  clearResultBlock() {
    if (this.resultBlock.querySelector('.not-found') != null) {
      this.resultBlock.querySelector('.not-found').remove();
    }
  }

  // удалить лоадер
  clearLoader() {
    if (this.resultBlock.querySelector('.loader-block') != null) {
      this.resultBlock.querySelector('.loader-block').remove();
    }
  }

  // очистка контейнера карточек
  clearCardContainer() {
    this.container.innerHTML = '';
  }

  // добавляет тексты на станцу сохраненные
  renderArticlesInfo(count) {
    this.pageTitle.textContent = `${logProps.userName}, у вас ${count} сохранённых статей`;
  }

  // добавляет тексты
  renderSubtitle(keyword) {
    this.keywordArr.push(keyword); // добавим в массив все ключевые слова
    // элементы массива должны быть уникальны
    this.keywordArr = this.keywordArr.sort().filter((item, index) => item !== this.keywordArr[index + 1]);
    // если до 3 ключевых слов - отображаем все, если больше 3 перечисляем кол-во остальных
    const another = this.keywordArr.length <= 3 ? this.keywordArr[2] : `${this.keywordArr.length - 2} другим`;
    // вставим правильный текст в pageSubtitle
    switch (this.keywordArr.length) {
      case 1:
        this.pageSubtitle.textContent = `По ключевому слову ${this.keywordArr[0]}`;
        break;
      case 2:
        this.pageSubtitle.textContent = `По ключевым словам ${this.keywordArr[0]} и ${this.keywordArr[1]}`;
        break;
      default:
        this.pageSubtitle.textContent = `По ключевым словам ${this.keywordArr[0]}, ${this.keywordArr[1]} и ${another}`;
    }
  }

  // добавить карточки в список
  addCard(cardsContainer, newCard) {
    // 3 карточки поажем, остальные в массив
    if (cardsContainer.childNodes.length <= 2 && logProps.page === 'main') {
      cardsContainer.appendChild(newCard);
    } else if (cardsContainer.childNodes.length >= 3 && logProps.page === 'main') {
      this.accumCards.push(newCard);
    } else {
      // если мы на страничке с сохр. статьями, надо показать их всех
      cardsContainer.appendChild(newCard);
    }
  }

  // показать ещё карточки
  showMore(event) {
    if (this.accumCards.length > 0) {
      const counter = this.accumCards.length >= 3 ? 3 : this.accumCards.length;
      for (let i = 0; i < counter; i++) {
        // показать первый элемент
        this.container.appendChild(this.accumCards[0]);
        // а потом удалить её из массива
        this.accumCards.splice(0, 1);
        // и так три раза...
      }
    } else {
      // когда статьи закончились, надо об этом сообщить
      this.renderShowMoreButton(event.target);
    }
  }

  // когда статьи закончились, надо об этом сообщить
  renderShowMoreButton(button) {
    button.value = 'Это всё';
  }
}
