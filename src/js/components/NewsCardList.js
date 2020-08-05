export default class NewsCardList {
  constructor(container, cardClass) {
    this.container = container;
    this.cardClass = cardClass;
  }

  renderResults(arr) {
    const cardsContainer = this.container;
    // очистка предыдущих результатов
    cardsContainer.innerHTML = '';
    arr.articles.forEach((item) => {
      const urlImg = item.urlToImage;
      const date = item.publishedAt;
      const { title } = item;
      const content = item.description;
      const source = item.source.name;
      const newCard = this.cardClass.createCard(urlImg, date, title, content, source);
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
