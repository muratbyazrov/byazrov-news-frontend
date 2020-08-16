const date = new Date();

export default class Searcher {
  constructor(newsApi, newsList) {
    this.newsApi = newsApi;
    this.newsList = newsList;
    this.actualDate = '';
  }

  // стартовый метод
  startSearch(keyWord) {
    this.setActualDate(); // утсновить корректную дату для поиска
    this.searchNews(keyWord); // запустить поиск с ключевым словом
  }

  // сам поиск
  searchNews(keyWord) {
    this.newsApi.getNews(keyWord, this.actualDate) // обращаемся к новостному АПИ
      .then((res) => res.json())
      .then((res) => {
        this.newsList.renderResults(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // устанавливает корректную дату для поиска
  setActualDate() {
    this.actualDate = `${this.addZero(date.getFullYear())}-${this.addZero(date.getMonth() + 1)}-${this.addZero(date.getDate() - 7)}`;
  }

  // добавляем нолик перед однозначной датой
  // eslint-disable-next-line class-methods-use-this
  addZero(num) {
    if (num >= 0 && num <= 9) {
      return `0${num}`;
    }
    return num;
  }
}
