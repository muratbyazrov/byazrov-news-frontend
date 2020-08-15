import { logProps } from "../constans/constans";
export default class NewsCardList {
  constructor(container, cardClass, pageTitle, pageSubtitle) {
    this.container = container;
    this.cardClass = cardClass;
    this.pageTitle = pageTitle;
    this.pageSubtitle = pageSubtitle;
    this.keywordArr = [];
    this.accumCards = [];
  }

  renderResults(obj) {
    const cardsContainer = this.container;
    this.showResultBlock(cardsContainer.parentNode)
    // проверка, для какой страницы рендерим карточки
    const condition = logProps.page === 'main'
    // очистка предыдущих результатов
    cardsContainer.innerHTML = '';
    obj.articles.forEach((item) => {
      const keyword = item.keyword;
      const image = condition ? item.urlToImage : item.image;
      const date = condition ? item.publishedAt : item.date;
      const { title } = item;
      const text = condition ? item.description : item.text;
      const source = condition ? item.source.name : item.source;
      const link = condition ? item.url : item.link;
      const cardId = item._id;
      // создать карточки используя исходные данные выше
      const newCard = this.cardClass.createCard(keyword, title, text, date, source, link, image, cardId);
      // добавить карточки
      this.addCard(cardsContainer, newCard)
      // отредактировать тексты
      this.renderSubtitle(keyword)
    });
    this.renderArticlesInfo(obj.articles.length)
  }

  // добавляет тексты
  renderArticlesInfo(count) {
    if (logProps.page === 'saved') {
      this.pageTitle.textContent = `${logProps.userName}, у вас ${count} сохранённых статей`
    }
  }
  // добавляет тексты
  renderSubtitle(keyword) {
    if (logProps.page === 'saved') {
      // добавим в массив все ключевые слова
      this.keywordArr.push(keyword);
      // элементы массива должны быть уникальны
      this.keywordArr = this.keywordArr.sort().filter((item, index) => item !== this.keywordArr[index + 1]);
      // если до 3 ключевых слов - отображаем все, если больше 3 перечисляем кол-во остальных
      const another = this.keywordArr.length <= 3 ? this.keywordArr[2] : `${this.keywordArr.length - 2} другим`;
      // вставим правильный текст в pageSubtitle
      this.pageSubtitle.textContent = `По ключевым словам ${this.keywordArr[0]}, ${this.keywordArr[1]} и ${another}`
    }
  }
  /*     renderLoader() {
        // будет отвечать за отрисовку лоадера
      }

      renderError() {
        // принимает объект ошибки и отрисовывает его в интерфейсе
        (наверное в то поле можно и другие ошибки кроме ничего не найдено)
      } */

  // добавить карточки в список
  addCard(cardsContainer, newCard) {
    // если элементов в контейнере больше 3, добавлять карточки перестаем. Но записываем эти карточки в массив
    if (cardsContainer.childNodes.length <= 2 && logProps.page === 'main') {
      cardsContainer.appendChild(newCard);
    } else if (cardsContainer.childNodes.length >= 3 && logProps.page === 'main') {
      this.accumCards.push(newCard);
    } else {
      // если мы на страничке с сохр. статьями, надо показать их всех
      cardsContainer.appendChild(newCard);
    }
  }
  // когда поступила команда показать ещё - рендерим оставшуюся часть карточек, которые остались в массиве
  showMore() {
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
    button.value = 'Это всё'
  }

  showResultBlock(block) {
    block.classList.add('display')
  }

}
