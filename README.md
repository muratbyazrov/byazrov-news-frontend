# frontend-часть приложения для новостей NewsEplorer
-  Ссылка на приложение [в сети](https://byazrov-news.ga)
-  Cсылка на работающую страничку  [gh-pages](https://muratbyazrov.github.io/byazrov-news-frontend/)
-  Бэкенд можно посмотреть по [здесь](https://github.com/muratbyazrov/byazrov-news-api)

### Описание приложения NewsEplorer
#### Данное приложение представляет собой новостной поисковик, то есть можно вбить ключевое слово и приложение выдаст релевантные новости за последние 7 дней в удобной форме - в виде карточек. Карточки можно сохранить в закладках и удалить из закладок. Можно кликнуть на карточку и перейти на соответствующий новостной ресурс. Реализована авторизация и регистрация пользовталей. Работа авторизации, регистрации, а так же сохранения и удаления карточек описана в [бекенд-части](https://github.com/muratbyazrov/byazrov-news-api) приложения. Приложение двустраничное: на главной странице находится блок поиска и блок "Об авторе". Вторая страницв доступна только авризованным пользователям. На второй странице пользователю показываются сохраненные им карточки новостей. Как уже упоминалось выше, карточки можно удалять. Поиск по новостям можно вести и неавторизованным пользователям

#### Особенности:
- Верстка семантическая
- Модульный код по БЭМ 
- Для позиционирования элементов применялись Flex layout и Grid Layout. 
- Приложение адаптированао под все устройства. 
- Код объектно-ориентированный. 
- Реализованы асинхронные GET- и POST-запросы к API
- Карточки с новостями добавляются в DOM из JS-кода
- Есть прелоудер
- Клик по карточке переводит на статью на сайте издания
- Данные в форме валидируются и обрабатываются до отправки на сервер и после отправки на сервер
 
#### Для работы с репозиторием необходимо склонировать его на свой локальный диск. Предлагается три скрипта для работы с файлом:
- `npm run dev` запустить сборку на локальном сервере 8080 с возможностью хот релоуд
- `npm ryn build` запустить боевую версию сборки
- `npm run deploy` опубликует сборку build на гитхабе в ветке gh-pages
- `npm run serdep` задеплоить фронт на сервер, если конечно у вас есть пароль от сервера (злобный смех)

#### Подробнее о работе приложения:


