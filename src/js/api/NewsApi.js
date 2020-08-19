export default class NewsApi {
  constructor() {
    this.params = ''; // чтобы еслинт не доставал
  }

  /*   // eslint-disable-next-line class-methods-use-this
  getNews(keyWord, actualDate) {
    return fetch(`http://newsapi.org/v2/everything?q=${keyWord}&from=${actualDate}&sortBy=popularity&apiKey=0809fef65efa4e06b9681496b0a3fa07`);
  } */

  // eslint-disable-next-line class-methods-use-this
  getNews(keyWord, actualDate) {
    return fetch(
      'http://newsapi.org/v2/everything?'
      + `q=${keyWord}&`
      + `from=${actualDate}&`
      + 'sortBy=publishedAt&'
      + 'pageSize=100&'
      + 'apiKey=0809fef65efa4e06b9681496b0a3fa07',
    );
  }
}
