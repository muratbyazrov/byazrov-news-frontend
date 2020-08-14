import { logProps } from "../constans/constans";
export default class NewsCardList {
  constructor(container, cardClass, pageTitle, pageSubtitle) {
    this.container = container;
    this.cardClass = cardClass;
    this.pageTitle = pageTitle;
    this.pageSubtitle = pageSubtitle;
    this.keywordArr = [];
  }

  renderResults(obj) {
    const cardsContainer = this.container;
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
      this.keywordArr = this.keywordArr.sort().filter((item, index) => item !== this.keywordArr[index+1]);
      // если до 3 ключевых слов - отображаем все, если больше 3 перечисляем кол-во остальных
      const another = this.keywordArr.length <= 3? this.keywordArr[2]: `${this.keywordArr.length-2} другим`;
      // вставим правильный текст в pageSubtitle
      this.pageSubtitle.textContent = `По ключевым словам ${this.keywordArr[0]}, ${this.keywordArr[1]} и ${another}`
    }
  }
  /*   renderLoader() {
      // будет отвечать за отрисовку лоадера
    }

    renderError() {
      // принимает объект ошибки и отрисовывает его в интерфейсе
      (наверное в то поле можно и другие ошибки кроме ничего не найдено)
    }

    showMore() {
      // кнопка показать ещё
    } */

  // добавить карточки в список
  addCard(cardsContainer, newCard) {
    cardsContainer.appendChild(newCard);
  }
}
