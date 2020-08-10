import { logProps } from "../constans/constans";

export default class NewsCardList {
  constructor(container, cardClass) {
    this.container = container;
    this.cardClass = cardClass;
  }

  renderResults(obj) {
    const cardsContainer = this.container;
    // проверка, для какой страницы рендерим карточки
    const condition = logProps.page === 'main'
    // очистка предыдущих результатов
    cardsContainer.innerHTML = '';
    obj.articles.forEach((item) => {
      const keyword = 'WTF'
      const image = condition? item.urlToImage: item.image;
      const date = condition? item.publishedAt: item.date;
      const { title } = item;
      const text = condition? item.description: item.text;
      const source = condition? item.source.name: item.source;
      const link = condition? item.url: item.link;
      const newCard = this.cardClass.createCard(keyword, title, text, date, source, link, image);
      cardsContainer.appendChild(newCard);
    });
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

  addCard() {
    // принимает экземпляр карточки и добавляет в список (видимо сохраненное)
  }
}
