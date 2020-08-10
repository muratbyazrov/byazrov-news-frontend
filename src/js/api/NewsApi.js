import { actualDate } from '../utils/utils';

class NewsApi {
  constructor(cardListClass) {
    this.cardListClass = cardListClass;
  }

  getNews(keyWord) {
    return fetch(`http://newsapi.org/v2/everything?q=${keyWord}&from=${actualDate}&sortBy=popularity&apiKey=0809fef65efa4e06b9681496b0a3fa07`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.cardListClass.renderResults(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export {
  NewsApi,
};
