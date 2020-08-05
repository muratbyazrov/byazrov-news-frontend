// класс карточки новости
export class NewsCard {
  constructor() {

  }
  renderIcon() {
    // обрабатывает три состояния иконки: 1. иконка незалогенного пользователя (показывает сообщение "залогинься, чтобы сохранить карточку")
    // 2. неактивная иконка залогенного пользователя (нет сообщения выше)
    // 3. активная иконка залогенного - видио синяя
  }

  createCard(urlImg, date, title, content, source) {
    const card = document.createElement('div');
    card.classList.add('card')
    card.insertAdjacentHTML('afterbegin',
      `<div class="card__head">
        <img src="АДРЕС КАРТИНКИ" class="card__image" alt="картинка к новости">
        <div class="card__button card__button_save" data-title="Войдите, чтобы сохранять статьи"></div>
      </div>

      <div class="card__details">
        <p class="card__date"> ТУТ ДОЛЖНА БЫТЬ ДАТА </p>
        <h3 class="card__title"> ТУТ ДОЛЖНО БЫТЬ КРАТКОЕ ОПИСАНИЕ </h3>
        <p class="card__text"> ТУТ ПОЛНОЕ ОПИСАНИЕ </p>
        <p class="card__source"> НОВОСТНОЙ РЕСУРС </p>
    </div>`);

   card.querySelector('.card__image').src = urlImg;
   card.querySelector('.card__date').textContent = date;
   card.querySelector('.card__title').textContent = title;
   card.querySelector('.card__text').textContent = content;
   card.querySelector('.card__source').textContent = source;
  return card
  }

  // тут могут быть другие методы: Удаление например
}

/* если часть интерфейса, которой управляет класс, подразумевает интерактивность,
конструктор этого класса может принимать массив обработчиков событий, которые нужно добавить его элементам.
 Обработчики следует передавать конструктору в виде массива, а за их добавление должен
  отвечать приватный метод _setHandlers. */