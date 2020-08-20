const date = new Date();

export default class Searcher {
  constructor(newsApi, newsList, searchField) {
    this.newsApi = newsApi;
    this.newsList = newsList;
    this.actualDate = '';
    this.searchField = searchField;
  }

  // стартовый метод
  startSearch(event) {
    event.preventDefault(); // остановить действие по умолчанию
    this.setActualDate(); // утсновить корректную дату для поиска
    this.checkKeyword(); // проверим текст зароса
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
      });
  }

  checkKeyword() {
    if (this.searchField.value === '') {
      this.searchField.placeholder = 'Пустой запрос'; // сообщение
      this.searchField.classList.add('search__field_error'); // красный стиль
    } else {
      this.newsList.renderLoader(); // показать лоадер
      this.searchField.classList.remove('search__field_error'); // убрать стиль
      this.searchNews(this.searchField.value); // запустить поиск
    }
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
