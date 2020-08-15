export default class NewsApi {
  constructor(actualDate) {
    this.actualDate = actualDate;
  }

  getNews(keyWord) {
    return fetch(`http://newsapi.org/v2/everything?q=${keyWord}&from=${this.actualDate}&sortBy=popularity&apiKey=0809fef65efa4e06b9681496b0a3fa07`, {
      method: 'GET',
    });
  }
}
