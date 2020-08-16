const date = new Date();

export default class Searcher {
  constructor(newsApi, newsList) {
    this.newsApi = newsApi;
    this.newsList = newsList;
    this.actualDate = '';
  }

  // стартовый метод
  startSearch(keyWord) {
    this.newsList.renderLoader(); // показать лоадер
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
      .then(() => {
        this.newsList.clearLoader(); // скрыть лоадер, когда пришли данные
      })
      .catch((err) => {
        this.newsList.clearLoader(); // все равно надо скрыть лоадер
        console.log(err);
        alert('Проверьте ваше интернет-соединение');
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
