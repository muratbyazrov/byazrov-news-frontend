import { logProps } from "../constans/constans";

export default class NewsCardList {
  constructor(container, cardClass, pageTitle) {
    this.container = container;
    this.cardClass = cardClass;
    this.pageTitle = pageTitle;
  }

  renderResults(obj) {
    const cardsContainer = this.container;
    // проверка, для какой страницы рендерим карточки
    const condition = logProps.page === 'main'
    // очистка предыдущих результатов
    cardsContainer.innerHTML = '';
    obj.articles.forEach((item) => {
      const keyword = item.keyword;
      const image = condition? item.urlToImage: item.image;
      const date = condition? item.publishedAt: item.date;
      const { title } = item;
      const text = condition? item.description: item.text;
      const source = condition? item.source.name: item.source;
      const link = condition? item.url: item.link;
      const cardId = item._id;
      const newCard = this.cardClass.createCard(keyword, title, text, date, source, link, image, cardId);

      this.addCard(cardsContainer, newCard)
    });
    this.renderArticlesInfo(obj.articles.length)
  }

  renderArticlesInfo(count) {
    if(logProps.page === 'saved') {
      this.pageTitle.textContent = `${logProps.userName}, у вас ${count} сохранённых статей`
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

  addCard(cardsContainer, newCard) {
    cardsContainer.appendChild(newCard);
  }
}
