export default class NewsApi {
  constructor(cardListClass, actualDate) {
    this.cardListClass = cardListClass;
    this.actualDate = actualDate;
  }

  getNews(keyWord) {
    return fetch(`http://newsapi.org/v2/everything?q=${keyWord}&from=${this.actualDate}&sortBy=popularity&apiKey=0809fef65efa4e06b9681496b0a3fa07`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        this.cardListClass.renderResults(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
