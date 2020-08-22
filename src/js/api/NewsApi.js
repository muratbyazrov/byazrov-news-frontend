export default class NewsApi {
  // конструкор удален. В доках к еслинт говориться, что можно так делать, если констр не нужен
  getNews(keyWord, actualDate) {
    return fetch(
      'https://nomoreparties.co/news/v2/everything?'
      + `q=${keyWord}&`
      + `from=${actualDate}&`
      + 'sortBy=publishedAt&'
      + 'pageSize=100&'
      + 'apiKey=0809fef65efa4e06b9681496b0a3fa07',
    );
  }
}
